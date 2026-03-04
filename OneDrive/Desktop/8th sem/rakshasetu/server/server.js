/**
 * RakshaSetu - Main Server
 * Smart Tourist Safety Monitoring System
 */

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const { checkSafeZone, detectAnomaly } = require('./geofence');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// In-memory storage
const activeTourists = new Map();
const alertHistory = [];
const locationHistory = new Map();

// Safe zone polygon
const SAFE_ZONES = [
    [[20.55, 78.95], [20.55, 79.15], [20.70, 79.15], [20.70, 78.95]]
];

// API Routes
app.get('/api/tourists', (req, res) => {
    const tourists = Array.from(activeTourists.values());
    res.json({ success: true, count: tourists.length, tourists });
});

app.get('/api/alerts', (req, res) => {
    res.json({ success: true, alerts: alertHistory.slice(0, 50) });
});

app.get('/api/safezones', (req, res) => {
    res.json({ success: true, safeZones: SAFE_ZONES });
});

app.get('/api/stats', (req, res) => {
    const tourists = Array.from(activeTourists.values());
    res.json({
        success: true,
        stats: {
            activeTourists: tourists.length,
            safe: tourists.filter(t => t.status === 'safe').length,
            warning: tourists.filter(t => t.status === 'warning').length,
            sos: tourists.filter(t => t.status === 'sos').length,
            totalAlerts: alertHistory.length
        }
    });
});

// Socket.io connection handling
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Register tourist
    socket.on('register', (data) => {
        const { userId, name } = data;
        
        const tourist = {
            id: socket.id,
            userId: userId || 'TOURIST-' + Date.now(),
            name: name || 'Anonymous',
            lat: 20.60,
            lng: 79.00,
            speed: 0,
            status: 'safe',
            lastUpdate: new Date(),
            inSafeZone: true
        };

        activeTourists.set(socket.id, tourist);
        
        socket.emit('registered', {
            success: true,
            tourist: tourist,
            safeZones: SAFE_ZONES
        });

        io.emit('touristJoined', tourist);
        
        console.log('Tourist registered:', tourist.userId);
    });

    // Handle GPS location updates
    socket.on('locationUpdate', (data) => {
        const tourist = activeTourists.get(socket.id);
        if (!tourist) return;

        const { lat, lng, speed } = data;
        
        tourist.lat = lat;
        tourist.lng = lng;
        tourist.speed = speed || 0;
        tourist.lastUpdate = new Date();

        const history = locationHistory.get(socket.id) || [];
        history.push({ lat, lng, speed: tourist.speed, timestamp: Date.now() });
        if (history.length > 10) history.shift();
        locationHistory.set(socket.id, history);

        const zoneCheck = checkSafeZone(lat, lng, SAFE_ZONES);
        const wasInSafeZone = tourist.inSafeZone;
        tourist.inSafeZone = zoneCheck.isInside;

        if (wasInSafeZone && !zoneCheck.isInside) {
            tourist.status = 'warning';
            
            const alert = {
                id: Date.now(),
                userId: tourist.userId,
                type: 'GEO_FENCE_BREACH',
                message: 'Tourist left safe zone',
                location: { lat, lng },
                timestamp: new Date().toISOString()
            };
            
            alertHistory.unshift(alert);
            io.emit('alert', alert);
            console.log('Geo-fence breach:', tourist.userId);
        }

        if (history.length >= 2) {
            const anomaly = detectAnomaly(history[history.length - 1], history[history.length - 2]);
            
            if (anomaly.isAnomaly) {
                tourist.status = 'warning';
                
                const alert = {
                    id: Date.now(),
                    userId: tourist.userId,
                    type: anomaly.reason,
                    message: anomaly.message,
                    location: { lat, lng },
                    timestamp: new Date().toISOString()
                };
                
                alertHistory.unshift(alert);
                io.emit('alert', alert);
            }
        }

        if (tourist.status !== 'sos') {
            tourist.status = zoneCheck.isInside ? 'safe' : 'warning';
        }

        io.emit('locationUpdate', tourist);
    });

    // Handle SOS Emergency Alert - FIXED VERSION
    // Now accepts location data from client for accurate real-time positioning
    socket.on('sosAlert', (data) => {
        const tourist = activeTourists.get(socket.id);
        
        console.log('🚨 SOS received from:', socket.id);
        
        // Use location from client if available, otherwise fall back to stored location
        let lat, lng;
        if (data && data.lat !== undefined && data.lng !== undefined) {
            lat = data.lat;
            lng = data.lng;
            console.log('📍 Using client-provided location for SOS:', lat, lng);
        } else if (tourist) {
            lat = tourist.lat;
            lng = tourist.lng;
            console.log('📍 Using stored location for SOS:', lat, lng);
        } else {
            lat = 0;
            lng = 0;
        }
        
        // Update tourist's location with fresh SOS location
        if (tourist) {
            tourist.lat = lat;
            tourist.lng = lng;
            tourist.status = 'sos';
            tourist.lastUpdate = new Date();
        }
        
        const alert = {
            id: Date.now(),
            userId: tourist ? tourist.userId : 'UNKNOWN',
            type: 'SOS',
            message: 'EMERGENCY SOS - Immediate assistance required!',
            location: { 
                lat: lat, 
                lng: lng 
            },
            timestamp: new Date().toISOString()
        };

        alertHistory.unshift(alert);
        if (alertHistory.length > 100) alertHistory.pop();

        // Emit to ALL clients including admin - THIS IS THE FIX
        io.emit('sosAlert', alert);
        io.emit('alert', alert);
        
        console.log('🚨 SOS ALERT BROADCAST:', alert);
    });

    socket.on('stopTracking', () => {
        activeTourists.delete(socket.id);
        locationHistory.delete(socket.id);
        io.emit('touristLeft', { id: socket.id });
    });

    socket.on('disconnect', () => {
        activeTourists.delete(socket.id);
        locationHistory.delete(socket.id);
        io.emit('touristLeft', { id: socket.id });
        console.log('Client disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('============================================================');
    console.log('       RakshaSetu - Smart Tourist Safety System');
    console.log('============================================================');
    console.log('Server: http://localhost:' + PORT);
    console.log('Tourist App: http://localhost:' + PORT + '/tourist.html');
    console.log('Admin Dashboard: http://localhost:' + PORT + '/admin.html');
    console.log('============================================================');
});
