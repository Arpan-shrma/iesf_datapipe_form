<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IESF Environmental Data Platform</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            min-height: 100vh;
            line-height: 1.6;
        }

        .container {
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            background: linear-gradient(135deg, #2d5016 0%, #4a7c59 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
            border-radius: 15px;
            margin-bottom: 30px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        }

        .header h1 {
            font-size: 32px;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .header p {
            font-size: 18px;
            opacity: 0.9;
        }

        .data-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 25px;
            margin-bottom: 30px;
        }

        .data-card {
            background: white;
            border-radius: 15px;
            padding: 25px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 5px 20px rgba(0,0,0,0.08);
            border: 3px solid transparent;
            position: relative;
            overflow: hidden;
        }

        .data-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: var(--card-color);
            transform: scaleX(0);
            transition: transform 0.3s ease;
        }

        .data-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.15);
            border-color: var(--card-color);
        }

        .data-card:hover::before {
            transform: scaleX(1);
        }

        .card-header {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
        }

        .card-icon {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
            margin-right: 20px;
            background: var(--card-bg-color);
            color: var(--card-color);
        }

        .card-title {
            color: var(--card-color);
            font-size: 20px;
            font-weight: 600;
        }

        .card-description {
            color: #666;
            margin-bottom: 20px;
            line-height: 1.6;
        }

        .card-button {
            padding: 12px 24px;
            background: var(--card-color);
            color: white;
            border-radius: 25px;
            text-align: center;
            font-weight: 600;
            font-size: 14px;
            letter-spacing: 0.5px;
        }

        .back-button {
            display: inline-flex;
            align-items: center;
            background: #6c757d;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 25px;
            cursor: pointer;
            margin-bottom: 25px;
            font-size: 16px;
            transition: all 0.3s ease;
            text-decoration: none;
        }

        .back-button:hover {
            background: #5a6268;
            transform: translateX(-3px);
        }

        .form-section {
            background: white;
            padding: 30px;
            border-radius: 15px;
            margin-bottom: 25px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.08);
            border-left: 5px solid var(--section-color);
        }

        .form-section h3 {
            color: var(--section-color);
            margin-bottom: 20px;
            font-size: 20px;
            display: flex;
            align-items: center;
        }

        .form-section h3::before {
            content: var(--section-icon);
            margin-right: 10px;
            font-size: 24px;
        }

        .form-grid {
            display: grid;
            gap: 20px;
        }

        .form-grid.two-col {
            grid-template-columns: 1fr 1fr;
        }

        .form-grid.three-col {
            grid-template-columns: 1fr 1fr 1fr;
        }

        .form-field {
            margin-bottom: 20px;
        }

        .form-label {
            display: block;
            font-weight: 600;
            margin-bottom: 8px;
            color: #333;
            font-size: 14px;
        }

        .required {
            color: #dc3545;
        }

        .form-input, .form-select, .form-textarea {
            width: 100%;
            padding: 14px 16px;
            border: 2px solid #e1e5e9;
            border-radius: 10px;
            font-size: 16px;
            transition: all 0.3s ease;
            background: #fafbfc;
        }

        .form-input:focus, .form-select:focus, .form-textarea:focus {
            outline: none;
            border-color: var(--focus-color, #007bff);
            background: white;
            box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
        }

        .form-textarea {
            resize: vertical;
            min-height: 100px;
        }

        .gps-button {
            background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
            color: white;
            border: none;
            padding: 14px 20px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 20px;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
        }

        .gps-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,123,255,0.3);
        }

        .submit-button {
            width: 100%;
            padding: 18px;
            background: linear-gradient(135deg, var(--submit-color) 0%, var(--submit-hover-color) 100%);
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 20px;
        }

        .submit-button:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        }

        .submit-button:disabled {
            background: #cccccc;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }

        .success-message {
            background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
            color: #155724;
            padding: 20px;
            border-radius: 12px;
            margin-top: 20px;
            border-left: 5px solid #28a745;
            font-weight: 600;
        }

        .error-message {
            background: linear-gradient(135deg, #f8d7da 0%, #f1aeb5 100%);
            color: #721c24;
            padding: 20px;
            border-radius: 12px;
            margin-top: 20px;
            border-left: 5px solid #dc3545;
            font-weight: 600;
        }

        .info-box {
            background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
            border: 1px solid #ffeaa7;
            padding: 20px;
            border-radius: 12px;
            margin: 20px 0;
            border-left: 5px solid #ffc107;
        }

        .mobile-instructions {
            background: white;
            padding: 25px;
            border-radius: 15px;
            margin-top: 30px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.08);
            border-left: 5px solid #17a2b8;
        }

        .mobile-instructions h3 {
            color: #17a2b8;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
        }

        .mobile-instructions h3::before {
            content: '📱';
            margin-right: 10px;
            font-size: 24px;
        }

        .grid-info {
            background: linear-gradient(135deg, #d1ecf1 0%, #bee5eb 100%);
            padding: 15px;
            border-radius: 10px;
            margin-top: 15px;
            border-left: 4px solid #17a2b8;
        }

        .hidden {
            display: none !important;
        }

        .loading {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid #3498db;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-right: 10px;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
            .container {
                padding: 15px;
            }
            
            .data-grid {
                grid-template-columns: 1fr;
            }
            
            .form-grid.two-col,
            .form-grid.three-col {
                grid-template-columns: 1fr;
            }
            
            .header h1 {
                font-size: 24px;
            }
            
            .header p {
                font-size: 16px;
            }
        }

        /* Card specific colors */
        .species-card { --card-color: #28a745; --card-bg-color: #d4edda; }
        .water-card { --card-color: #007bff; --card-bg-color: #cce7ff; }
        .sar-card { --card-color: #dc3545; --card-bg-color: #f8d7da; }
        .habitat-card { --card-color: #6f42c1; --card-bg-color: #e2d9f3; }
        .bathymetry-card { --card-color: #fd7e14; --card-bg-color: #ffe8d1; }

        /* Form specific colors */
        .species-form { --section-color: #28a745; --focus-color: #28a745; --submit-color: #28a745; --submit-hover-color: #218838; }
        .water-form { --section-color: #007bff; --focus-color: #007bff; --submit-color: #007bff; --submit-hover-color: #0056b3; }
        .sar-form { --section-color: #dc3545; --focus-color: #dc3545; --submit-color: #dc3545; --submit-hover-color: #c82333; }
        .habitat-form { --section-color: #6f42c1; --focus-color: #6f42c1; --submit-color: #6f42c1; --submit-hover-color: #5a32a3; }
        .bathymetry-form { --section-color: #fd7e14; --focus-color: #fd7e14; --submit-color: #fd7e14; --submit-hover-color: #e8690b; }

        /* Section icons */
        .observer-section { --section-icon: '👤'; }
        .location-section { --section-icon: '📍'; }
        .species-section { --section-icon: '🦋'; }
        .water-section { --section-icon: '🏞️'; }
        .conditions-section { --section-icon: '🌡️'; }
        .measurements-section { --section-icon: '🧪'; }
        .site-section { --section-icon: '🏞️'; }
        .conservation-section { --section-icon: '⚠️'; }
        .habitat-section { --section-icon: '🌲'; }
        .assessment-section { --section-icon: '📝'; }
        .lake-section { --section-icon: '🏞️'; }
        .depth-section { --section-icon: '📏'; }
        .context-section { --section-icon: '🌡️'; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🌲 IESF Environmental Data Platform</h1>
            <p>Intelligent Environmental Solutions Foundry - Field Data Collection System</p>
        </div>

        <!-- HOME PAGE -->
        <div id="homePage">
            <div style="text-align: center; margin-bottom: 30px;">
                <h2 style="color: #333; margin-bottom: 10px; font-size: 28px;">Select Data Type to Submit</h2>
                <p style="color: #666; font-size: 18px;">Choose the type of environmental data you want to record</p>
            </div>
            
            <div class="data-grid">
                <div class="data-card species-card" onclick="showSpeciesForm()">
                    <div class="card-header">
                        <div class="card-icon">🦅</div>
                        <h3 class="card-title">Species Observation</h3>
                    </div>
                    <p class="card-description">Record wildlife sightings and biodiversity data with precise location tracking and behavioral observations.</p>
                    <div class="card-button">Start Data Entry →</div>
                </div>
                
                <div class="data-card water-card" onclick="showWaterForm()">
                    <div class="card-header">
                        <div class="card-icon">💧</div>
                        <h3 class="card-title">Water Quality Testing</h3>
                    </div>
                    <p class="card-description">Submit water quality measurements including pH, dissolved oxygen, temperature, and clarity data.</p>
                    <div class="card-button">Start Data Entry →</div>
                </div>
                
                <div class="data-card sar-card" onclick="showSARForm()">
                    <div class="card-header">
                        <div class="card-icon">🛡️</div>
                        <h3 class="card-title">Species at Risk (SAR)</h3>
                    </div>
                    <p class="card-description">Report endangered and threatened species observations with conservation status tracking.</p>
                    <div class="card-button">Start Data Entry →</div>
                </div>
                
                <div class="data-card habitat-card" onclick="showHabitatForm()">
                    <div class="card-header">
                        <div class="card-icon">🌳</div>
                        <h3 class="card-title">Habitat Assessment</h3>
                    </div>
                    <p class="card-description">Document habitat types, ecosystem characteristics, and associated species distributions.</p>
                    <div class="card-button">Start Data Entry →</div>
                </div>
                
                <div class="data-card bathymetry-card" onclick="showBathymetryForm()">
                    <div class="card-header">
                        <div class="card-icon">⛰️</div>
                        <h3 class="card-title">Bathymetry Data</h3>
                    </div>
                    <p class="card-description">Submit lake depth and temperature measurements for aquatic ecosystem mapping.</p>
                    <div class="card-button">Start Data Entry →</div>
                </div>
            </div>

            <div class="mobile-instructions">
                <h3>Mobile Data Collection Instructions</h3>
                <div style="color: #666; line-height: 1.6;">
                    <p><strong>📍 For GPS coordinates:</strong></p>
                    <ul style="padding-left: 20px; margin: 10px 0;">
                        <li><strong>iPhone:</strong> Open "Compass" app → swipe left to see coordinates</li>
                        <li><strong>Android:</strong> Open "Google Maps" → long-press your location → coordinates appear at bottom</li>
                        <li><strong>Format:</strong> Use decimal degrees (e.g., 45.123456, -81.654321)</li>
                    </ul>
                    <p><strong>📱 Data Entry Tips:</strong></p>
                    <ul style="padding-left: 20px; margin: 10px 0;">
                        <li>Work offline - data is saved locally until submitted</li>
                        <li>Take photos separately and reference them in notes</li>
                        <li>Double-check species names and coordinates before submitting</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- SPECIES OBSERVATION FORM -->
        <div id="speciesForm" class="hidden species-form">
            <button class="back-button" onclick="showHome()">← Back to Home</button>
            
            <h2 style="color: #28a745; margin-bottom: 25px; font-size: 28px;">🦅 Species Observation Form</h2>
            
            <div class="form-section observer-section">
                <h3>Observer Information</h3>
                <div class="form-grid three-col">
                    <div class="form-field">
                        <label class="form-label">Observer Name <span class="required">*</span></label>
                        <input type="text" id="observerName" class="form-input" placeholder="Your full name" required>
                    </div>
                    <div class="form-field">
                        <label class="form-label">Date <span class="required">*</span></label>
                        <input type="date" id="observationDate" class="form-input" required>
                    </div>
                    <div class="form-field">
                        <label class="form-label">Time <span class="required">*</span></label>
                        <input type="time" id="observationTime" class="form-input" required>
                    </div>
                </div>
            </div>

            <div class="form-section location-section">
                <h3>Location Information</h3>
                <button class="gps-button" onclick="getLocation('species')">
                    📍 Get GPS Location
                </button>
                <div class="form-grid two-col">
                    <div class="form-field">
                        <label class="form-label">Latitude <span class="required">*</span></label>
                        <input type="number" id="species_latitude" class="form-input" placeholder="45.123456" step="0.000001" required>
                    </div>
                    <div class="form-field">
                        <label class="form-label">Longitude <span class="required">*</span></label>
                        <input type="number" id="species_longitude" class="form-input" placeholder="-81.654321" step="0.000001" required>
                    </div>
                </div>
                <div id="species_gridInfo" class="grid-info hidden">
                    <strong>Grid Assignment:</strong> <span id="species_gridText"></span>
                </div>
            </div>

            <div class="form-section species-section">
                <h3>Species Information</h3>
                <div class="form-grid three-col">
                    <div class="form-field">
                        <label class="form-label">Species Name <span class="required">*</span></label>
                        <input type="text" id="speciesName" class="form-input" placeholder="American Robin" required>
                    </div>
                    <div class="form-field">
                        <label class="form-label">Category <span class="required">*</span></label>
                        <select id="category" class="form-select" required>
                            <option value="">Select category...</option>
                            <option value="Birds">Birds</option>
                            <option value="Mammals">Mammals</option>
                            <option value="Reptiles">Reptiles</option>
                            <option value="Amphibians">Amphibians</option>
                            <option value="Fish">Fish</option>
                            <option value="Insects">Insects</option>
                            <option value="Plants">Plants</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div class="form-field">
                        <label class="form-label">Count <span class="required">*</span></label>
                        <input type="number" id="observationCount" class="form-input" value="1" min="1" required>
                    </div>
                </div>
                
                <div class="form-field">
                    <label class="form-label">Survey Site Description</label>
                    <input type="text" id="surveySite" class="form-input" placeholder="Near lake shore, forest edge, meadow, etc.">
                </div>
                
                <div class="form-field">
                    <label class="form-label">Additional Notes</label>
                    <textarea id="species_notes" class="form-textarea" placeholder="Behavior observed, weather conditions, habitat details, associated species, etc." rows="4"></textarea>
                </div>
            </div>

            <button class="submit-button" onclick="submitSpeciesData()">
                Submit Species Observation
            </button>
            
            <div id="species_submitMessage"></div>
        </div>

        <!-- WATER QUALITY FORM -->
        <div id="waterForm" class="hidden water-form">
            <button class="back-button" onclick="showHome()">← Back to Home</button>
            
            <h2 style="color: #007bff; margin-bottom: 25px; font-size: 28px;">💧 Water Quality Testing Form</h2>
            
            <div class="form-section observer-section">
                <h3>Surveyor Information</h3>
                <div class="form-grid three-col">
                    <div class="form-field">
                        <label class="form-label">Surveyor Name <span class="required">*</span></label>
                        <input type="text" id="water_surveyorName" class="form-input" placeholder="Your full name" required>
                    </div>
                    <div class="form-field">
                        <label class="form-label">Test Date <span class="required">*</span></label>
                        <input type="date" id="water_testDate" class="form-input" required>
                    </div>
                    <div class="form-field">
                        <label class="form-label">Test Time <span class="required">*</span></label>
                        <input type="time" id="water_testTime" class="form-input" required>
                    </div>
                </div>
            </div>

            <div class="form-section location-section">
                <h3>Location Information</h3>
                <button class="gps-button" onclick="getLocation('water')">
                    📍 Get GPS Location
                </button>
                <div class="form-grid two-col">
                    <div class="form-field">
                        <label class="form-label">Latitude <span class="required">*</span></label>
                        <input type="number" id="water_latitude" class="form-input" placeholder="45.123456" step="0.000001" required>
                    </div>
                    <div class="form-field">
                        <label class="form-label">Longitude <span class="required">*</span></label>
                        <input type="number" id="water_longitude" class="form-input" placeholder="-81.654321" step="0.000001" required>
                    </div>
                </div>
                <div id="water_gridInfo" class="grid-info hidden">
                    <strong>Grid Assignment:</strong> <span id="water_gridText"></span>
                </div>
            </div>

            <div class="form-section water-section">
                <h3>Water Body Information</h3>
                <div class="form-field">
                    <label class="form-label">Waterbody Name <span class="required">*</span></label>
                    <input type="text" id="waterbodyName" class="form-input" placeholder="Fish Lake, McFee Lake, etc." required>
                </div>
            </div>

            <div class="form-section conditions-section">
                <h3>Environmental Conditions</h3>
                <div class="form-grid two-col">
                    <div class="form-field">
                        <label class="form-label">Air Temperature (°C)</label>
                        <input type="number" id="airTemperature" class="form-input" placeholder="20.5" step="0.1">
                    </div>
                    <div class="form-field">
                        <label class="form-label">Wind Conditions</label>
                        <select id="windSpeed" class="form-select">
                            <option value="">Select wind conditions...</option>
                            <option value="Calm">Calm (0-1 km/h)</option>
                            <option value="Light">Light (2-11 km/h)</option>
                            <option value="Moderate">Moderate (12-28 km/h)</option>
                            <option value="Strong">Strong (29+ km/h)</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="form-section measurements-section">
                <h3>Water Quality Measurements</h3>
                <div class="form-grid three-col">
                    <div class="form-field">
                        <label class="form-label">pH Level</label>
                        <input type="number" id="ph" class="form-input" placeholder="7.0" step="0.1" min="0" max="14">
                    </div>
                    <div class="form-field">
                        <label class="form-label">Water Clarity (m)</label>
                        <input type="text" id="waterClarity" class="form-input" placeholder="1.5">
                    </div>
                    <div class="form-field">
                        <label class="form-label">Water Depth (m)</label>
                        <input type="text" id="water_depth" class="form-input" placeholder="3.0">
                    </div>
                    <div class="form-field">
                        <label class="form-label">Water Temperature (°C)</label>
                        <input type="number" id="waterTemperature" class="form-input" placeholder="15.5" step="0.1">
                    </div>
                    <div class="form-field">
                        <label class="form-label">Dissolved Oxygen (%)</label>
                        <input type="number" id="dissolvedOxygenPercent" class="form-input" placeholder="85" min="0" max="100">
                    </div>
                    <div class="form-field">
                        <label class="form-label">Dissolved Oxygen (mg/L)</label>
                        <input type="number" id="dissolvedOxygenMgL" class="form-input" placeholder="8.5" step="0.1">
                    </div>
                </div>
                
                <div class="form-field">
                    <label class="form-label">Additional Notes</label>
                    <textarea id="water_notes" class="form-textarea" placeholder="Equipment used, weather conditions, water appearance, observations, etc." rows="3"></textarea>
                </div>
            </div>

            <button class="submit-button" onclick="submitWaterData()">
                Submit Water Quality Data
            </button>
            
            <div id="water_submitMessage"></div>
        </div>

        <!-- SAR FORM -->
        <div id="sarForm" class="hidden sar-form">
            <button class="back-button" onclick="showHome()">← Back to Home</button>
            
            <h2 style="color: #dc3545; margin-bottom: 25px; font-size: 28px;">🛡️ Species at Risk (SAR) Form</h2>
            
            <div class="info-box">
                <strong>⚠️ Important:</strong> Species at Risk observations are critical for conservation efforts. 
                Please ensure accurate identification and report any threats or disturbances observed.
            </div>
            
            <div class="form-section observer-section">
                <h3>Observer Information</h3>
                <div class="form-grid two-col">
                    <div class="form-field">
                        <label class="form-label">Observer Name <span class="required">*</span></label>
                        <input type="text" id="sar_observerName" class="form-input" placeholder="Your full name" required>
                    </div>
                    <div class="form-field">
                        <label class="form-label">Survey Date <span class="required">*</span></label>
                        <input type="date" id="sar_surveyDate" class="form-input" required>
                    </div>
                </div>
            </div>

            <div class="form-section location-section">
                <h3>Location Information</h3>
                <button class="gps-button" onclick="getLocation('sar')">
                    📍 Get GPS Location
                </button>
                <div class="form-grid two-col">
                    <div class="form-field">
                        <label class="form-label">Latitude <span class="required">*</span></label>
                        <input type="number" id="sar_latitude" class="form-input" placeholder="45.123456" step="0.000001" required>
                    </div>
                    <div class="form-field">
                        <label class="form-label">Longitude <span class="required">*</span></label>
                        <input type="number" id="sar_longitude" class="form-input" placeholder="-81.654321" step="0.000001" required>
                    </div>
                </div>
                <div id="sar_gridInfo" class="grid-info hidden">
                    <strong>Grid Assignment:</strong> <span id="sar_gridText"></span>
                </div>
            </div>

            <div class="form-section site-section">
                <h3>Site Information</h3>
                <div class="form-grid three-col">
                    <div class="form-field">
                        <label class="form-label">Survey Site</label>
                        <input type="text" id="sar_surveySite" class="form-input" placeholder="Site description or name">
                    </div>
                    <div class="form-field">
                        <label class="form-label">Habitat Number</label>
                        <input type="number" id="sar_habitatNumber" class="form-input" placeholder="1">
                    </div>
                    <div class="form-field">
                        <label class="form-label">Polygon Number</label>
                        <input type="text" id="sar_polygonNumber" class="form-input" placeholder="A1, B2, etc.">
                    </div>
                </div>
            </div>

            <div class="form-section species-section">
                <h3>Species Information</h3>
                <div class="form-grid two-col">
                    <div class="form-field">
                        <label class="form-label">Species Name (Common) <span class="required">*</span></label>
                        <input type="text" id="sar_speciesName" class="form-input" placeholder="Blanding's Turtle" required>
                    </div>
                    <div class="form-field">
                        <label class="form-label">Scientific Name</label>
                        <input type="text" id="sar_scientificName" class="form-input" placeholder="Emydoidea blandingii">
                    </div>
                </div>
                
                <div class="form-grid two-col">
                    <div class="form-field">
                        <label class="form-label">Count Observed <span class="required">*</span></label>
                        <input type="number" id="sar_speciesCount" class="form-input" value="1" min="1" required>
                    </div>
                    <div class="form-field">
                        <label class="form-label">Category</label>
                        <select id="sar_category" class="form-select">
                            <option value="">Select category...</option>
                            <option value="Birds">Birds</option>
                            <option value="Mammals">Mammals</option>
                            <option value="Reptiles">Reptiles</option>
                            <option value="Amphibians">Amphibians</option>
                            <option value="Fish">Fish</option>
                            <option value="Plants">Plants</option>
                            <option value="Insects">Insects</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="form-section conservation-section">
                <h3>Conservation Status</h3>
                <div class="form-grid two-col">
                    <div class="form-field">
                        <label class="form-label">Conservation Status <span class="required">*</span></label>
                        <select id="sar_conservationStatus" class="form-select" required>
                            <option value="">Select status...</option>
                            <option value="Endangered">Endangered</option>
                            <option value="Threatened">Threatened</option>
                            <option value="Special Concern">Special Concern</option>
                            <option value="Vulnerable">Vulnerable</option>
                            <option value="Extirpated">Extirpated</option>
                            <option value="At Risk">At Risk</option>
                            <option value="Unknown">Unknown</option>
                        </select>
                    </div>
                    <div class="form-field">
                        <label class="form-label">Risk Level</label>
                        <select id="sar_riskLevel" class="form-select">
                            <option value="">Select risk level...</option>
                            <option value="Critical">Critical</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                            <option value="Unknown">Unknown</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-grid two-col">
                    <div class="form-field">
                        <label class="form-label">Provincial Designation</label>
                        <select id="sar_provincialDesignation" class="form-select">
                            <option value="">Select designation...</option>
                            <option value="Endangered">Endangered</option>
                            <option value="Threatened">Threatened</option>
                            <option value="Special Concern">Special Concern</option>
                            <option value="No Status">No Status</option>
                            <option value="Not Listed">Not Listed</option>
                        </select>
                    </div>
                    <div class="form-field">
                        <label class="form-label">Federal Designation</label>
                        <select id="sar_federalDesignation" class="form-select">
                            <option value="">Select designation...</option>
                            <option value="Endangered">Endangered</option>
                            <option value="Threatened">Threatened</option>
                            <option value="Special Concern">Special Concern</option>
                            <option value="No Status">No Status</option>
                            <option value="Not Listed">Not Listed</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-field">
                    <label class="form-label">Protection Status</label>
                    <select id="sar_protectionStatus" class="form-select">
                        <option value="">Select protection status...</option>
                        <option value="Fully Protected">Fully Protected</option>
                        <option value="Partially Protected">Partially Protected</option>
                        <option value="No Legal Protection">No Legal Protection</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Unknown">Unknown</option>
                    </select>
                </div>
                
                <div class="form-field">
                    <label class="form-label">Additional Notes</label>
                    <textarea id="sar_notes" class="form-textarea" placeholder="Behavior, habitat conditions, threats observed, conservation concerns, etc." rows="3"></textarea>
                </div>
            </div>

            <button class="submit-button" onclick="submitSARData()">
                Submit SAR Observation
            </button>
            
            <div id="sar_submitMessage"></div>
        </div>

        <!-- HABITAT ASSESSMENT FORM -->
        <div id="habitatForm" class="hidden habitat-form">
            <button class="back-button" onclick="showHome()">← Back to Home</button>
            
            <h2 style="color: #6f42c1; margin-bottom: 25px; font-size: 28px;">🌳 Habitat Assessment Form</h2>
            
            <div class="form-section observer-section">
                <h3>Surveyor Information</h3>
                <div class="form-grid two-col">
                    <div class="form-field">
                        <label class="form-label">Surveyor Initials <span class="required">*</span></label>
                        <input type="text" id="habitat_surveyorInitials" class="form-input" placeholder="ABC" maxlength="10" required>
                    </div>
                    <div class="form-field">
                        <label class="form-label">Survey Date <span class="required">*</span></label>
                        <input type="date" id="habitat_surveyDate" class="form-input" required>
                    </div>
                </div>
            </div>

            <div class="form-section location-section">
                <h3>Location Information</h3>
                <button class="gps-button" onclick="getLocation('habitat')">
                    📍 Get GPS Location
                </button>
                <div class="form-grid two-col">
                    <div class="form-field">
                        <label class="form-label">Latitude <span class="required">*</span></label>
                        <input type="number" id="habitat_latitude" class="form-input" placeholder="45.123456" step="0.000001" required>
                    </div>
                    <div class="form-field">
                        <label class="form-label">Longitude <span class="required">*</span></label>
                        <input type="number" id="habitat_longitude" class="form-input" placeholder="-81.654321" step="0.000001" required>
                    </div>
                </div>
                <div id="habitat_gridInfo" class="grid-info hidden">
                    <strong>Grid Assignment:</strong> <span id="habitat_gridText"></span>
                </div>
            </div>

            <div class="form-section site-section">
                <h3>Site Information</h3>
                <div class="form-grid three-col">
                    <div class="form-field">
                        <label class="form-label">Survey Site</label>
                        <input type="number" id="habitat_surveySite" class="form-input" placeholder="1">
                    </div>
                    <div class="form-field">
                        <label class="form-label">Habitat Number</label>
                        <input type="number" id="habitat_habitatNumber" class="form-input" placeholder="1">
                    </div>
                    <div class="form-field">
                        <label class="form-label">Polygon Number</label>
                        <input type="text" id="habitat_polygonNumber" class="form-input" placeholder="A1, B2, etc.">
                    </div>
                </div>
            </div>

            <div class="form-section habitat-section">
                <h3>Habitat Classification</h3>
                <div class="form-field">
                    <label class="form-label">Habitat Type <span class="required">*</span></label>
                    <select id="habitat_habitatType" class="form-select" required>
                        <option value="">Select habitat type...</option>
                        <option value="Deciduous Forest">Deciduous Forest</option>
                        <option value="Coniferous Forest">Coniferous Forest</option>
                        <option value="Mixed Forest">Mixed Forest</option>
                        <option value="Wetland">Wetland</option>
                        <option value="Marsh">Marsh</option>
                        <option value="Swamp">Swamp</option>
                        <option value="Bog">Bog</option>
                        <option value="Fen">Fen</option>
                        <option value="Prairie">Prairie</option>
                        <option value="Meadow">Meadow</option>
                        <option value="Lake">Lake</option>
                        <option value="River">River</option>
                        <option value="Stream">Stream</option>
                        <option value="Rocky Shore">Rocky Shore</option>
                        <option value="Sandy Shore">Sandy Shore</option>
                        <option value="Agricultural">Agricultural</option>
                        <option value="Urban">Urban</option>
                        <option value="Disturbed">Disturbed</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>

            <div class="form-section species-section">
                <h3>Associated Species</h3>
                <div class="form-grid two-col">
                    <div class="form-field">
                        <label class="form-label">Species Observed</label>
                        <input type="text" id="habitat_speciesName" class="form-input" placeholder="White-tailed Deer, Red Maple, etc.">
                    </div>
                    <div class="form-field">
                        <label class="form-label">Primary Category</label>
                        <select id="habitat_category" class="form-select">
                            <option value="">Select category...</option>
                            <option value="Birds">Birds</option>
                            <option value="Mammals">Mammals</option>
                            <option value="Reptiles">Reptiles</option>
                            <option value="Amphibians">Amphibians</option>
                            <option value="Fish">Fish</option>
                            <option value="Plants">Plants</option>
                            <option value="Insects">Insects</option>
                            <option value="Mixed">Mixed</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="form-section assessment-section">
                <h3>Habitat Assessment Notes</h3>
                <div class="form-field">
                    <label class="form-label">Detailed Habitat Description</label>
                    <textarea id="habitat_notes" class="form-textarea" placeholder="Describe vegetation structure, dominant species, disturbances, management needs, ecological conditions, etc." rows="4"></textarea>
                </div>
            </div>

            <button class="submit-button" onclick="submitHabitatData()">
                Submit Habitat Assessment
            </button>
            
            <div id="habitat_submitMessage"></div>
        </div>

        <!-- BATHYMETRY FORM -->
        <div id="bathymetryForm" class="hidden bathymetry-form">
            <button class="back-button" onclick="showHome()">← Back to Home</button>
            
            <h2 style="color: #fd7e14; margin-bottom: 25px; font-size: 28px;">⛰️ Bathymetry Data Form</h2>
            
            <div class="info-box">
                <strong>💡 Tip:</strong> For accurate bathymetry mapping, take measurements at regular intervals 
                and record GPS coordinates for each depth reading.
            </div>
            
            <div class="form-section observer-section">
                <h3>Surveyor Information</h3>
                <div class="form-grid two-col">
                    <div class="form-field">
                        <label class="form-label">Surveyor Name <span class="required">*</span></label>
                        <input type="text" id="bathymetry_surveyorName" class="form-input" placeholder="Your full name" required>
                    </div>
                    <div class="form-field">
                        <label class="form-label">Survey Date <span class="required">*</span></label>
                        <input type="date" id="bathymetry_surveyDate" class="form-input" required>
                    </div>
                </div>
            </div>

            <div class="form-section location-section">
                <h3>Location Information</h3>
                <button class="gps-button" onclick="getLocation('bathymetry')">
                    📍 Get GPS Location
                </button>
                <div class="form-grid two-col">
                    <div class="form-field">
                        <label class="form-label">Latitude <span class="required">*</span></label>
                        <input type="number" id="bathymetry_latitude" class="form-input" placeholder="45.123456" step="0.000001" required>
                    </div>
                    <div class="form-field">
                        <label class="form-label">Longitude <span class="required">*</span></label>
                        <input type="number" id="bathymetry_longitude" class="form-input" placeholder="-81.654321" step="0.000001" required>
                    </div>
                </div>
                <div id="bathymetry_gridInfo" class="grid-info hidden">
                    <strong>Grid Assignment:</strong> <span id="bathymetry_gridText"></span>
                </div>
            </div>

            <div class="form-section lake-section">
                <h3>Lake Information</h3>
                <div class="form-field">
                    <label class="form-label">Lake Name <span class="required">*</span></label>
                    <input type="text" id="bathymetry_lakeName" class="form-input" placeholder="Fish Lake, McFee Lake, etc." required>
                </div>
            </div>

            <div class="form-section depth-section">
                <h3>Measurements</h3>
                <div class="form-grid two-col">
                    <div class="form-field">
                        <label class="form-label">Depth (meters) <span class="required">*</span></label>
                        <input type="number" id="bathymetry_depthM" class="form-input" placeholder="5.2" step="0.1" min="0" required>
                    </div>
                    <div class="form-field">
                        <label class="form-label">Water Temperature (°C)</label>
                        <input type="number" id="bathymetry_temperatureC" class="form-input" placeholder="15" step="1">
                    </div>
                </div>
                
                <div class="form-grid three-col">
                    <div class="form-field">
                        <label class="form-label">Data Quality</label>
                        <select id="bathymetry_dataQuality" class="form-select">
                            <option value="good">Good</option>
                            <option value="excellent">Excellent</option>
                            <option value="fair">Fair</option>
                            <option value="poor">Poor</option>
                        </select>
                    </div>
                    <div class="form-field">
                        <label class="form-label">Depth Category</label>
                        <select id="bathymetry_depthCategory" class="form-select">
                            <option value="">Select category...</option>
                            <option value="shallow">Shallow</option>
                            <option value="medium">Medium</option>
                            <option value="deep">Deep</option>
                            <option value="very_deep">Very Deep</option>
                        </select>
                    </div>
                    <div class="form-field">
                        <label class="form-label">Temperature Category</label>
                        <select id="bathymetry_tempCategory" class="form-select">
                            <option value="">Select category...</option>
                            <option value="cold">Cold</option>
                            <option value="cool">Cool</option>
                            <option value="moderate">Moderate</option>
                            <option value="warm">Warm</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="form-section context-section">
                <h3>Environmental Context</h3>
                <div class="form-field">
                    <label class="form-label">Estimated Season</label>
                    <select id="bathymetry_estimatedSeason" class="form-select">
                        <option value="">Select season...</option>
                        <option value="spring">Spring</option>
                        <option value="summer">Summer</option>
                        <option value="fall">Fall</option>
                        <option value="winter">Winter</option>
                    </select>
                </div>
                
                <div class="form-field">
                    <label class="form-label">Additional Notes</label>
                    <textarea id="bathymetry_notes" class="form-textarea" placeholder="Equipment used, weather conditions, substrate type, vegetation, etc." rows="3"></textarea>
                </div>
            </div>

            <button class="submit-button" onclick="submitBathymetryData()">
                Submit Bathymetry Data
            </button>
            
            <div id="bathymetry_submitMessage"></div>
        </div>
    </div>

    <script>
        // SUPABASE CREDENTIALS
        const SUPABASE_URL = 'https://esyuykkooxyvmtwdyxqv.supabase.co';
        const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzeXV5a2tvb3h5dm10d2R5eHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxOTg5MTQsImV4cCI6MjA2OTc3NDkxNH0.OqHPL0h8qQccsPc3jDtGutXOHwVrOZ9avltGpp0qr38';

        // Initialize dates and times when page loads
        document.addEventListener('DOMContentLoaded', function() {
            const today = new Date();
            const dateString = today.toISOString().split('T')[0];
            const timeString = today.toTimeString().slice(0, 5);
            
            // Set default dates and times for all forms
            const dateFields = [
                'observationDate', 'water_testDate', 'sar_surveyDate', 
                'habitat_surveyDate', 'bathymetry_surveyDate'
            ];
            const timeFields = [
                'observationTime', 'water_testTime'
            ];
            
            dateFields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                if (field) field.value = dateString;
            });
            
            timeFields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                if (field) field.value = timeString;
            });
        });

        // Navigation functions
        function hideAllForms() {
            const forms = ['homePage', 'speciesForm', 'waterForm', 'sarForm', 'habitatForm', 'bathymetryForm'];
            forms.forEach(formId => {
                document.getElementById(formId).classList.add('hidden');
            });
        }

        function showHome() {
            hideAllForms();
            document.getElementById('homePage').classList.remove('hidden');
            // Clear any submit messages
            clearSubmitMessages();
        }

        function showSpeciesForm() {
            hideAllForms();
            document.getElementById('speciesForm').classList.remove('hidden');
        }

        function showWaterForm() {
            hideAllForms();
            document.getElementById('waterForm').classList.remove('hidden');
        }

        function showSARForm() {
            hideAllForms();
            document.getElementById('sarForm').classList.remove('hidden');
        }

        function showHabitatForm() {
            hideAllForms();
            document.getElementById('habitatForm').classList.remove('hidden');
        }

        function showBathymetryForm() {
            hideAllForms();
            document.getElementById('bathymetryForm').classList.remove('hidden');
        }

        function clearSubmitMessages() {
            const messageFields = [
                'species_submitMessage', 'water_submitMessage', 'sar_submitMessage',
                'habitat_submitMessage', 'bathymetry_submitMessage'
            ];
            messageFields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                if (field) field.innerHTML = '';
            });
        }

        // GPS Location function
        function getLocation(formType) {
            if (navigator.geolocation) {
                const button = event.target;
                const originalText = button.innerHTML;
                button.innerHTML = '<span class="loading"></span>Getting location...';
                button.disabled = true;
                
                navigator.geolocation.getCurrentPosition(
                    function(position) {
                        const lat = position.coords.latitude.toFixed(6);
                        const lon = position.coords.longitude.toFixed(6);
                        
                        document.getElementById(`${formType}_latitude`).value = lat;
                        document.getElementById(`${formType}_longitude`).value = lon;
                        
                        button.innerHTML = originalText;
                        button.disabled = false;
                        
                        // Calculate grid assignment
                        calculateGridAssignment(lat, lon, formType);
                        
                        showMessage('success', 'Location captured successfully!', `${formType}_submitMessage`);
                    },
                    function(error) {
                        button.innerHTML = originalText;
                        button.disabled = false;
                        showMessage('error', 'Could not get location. Please enter coordinates manually.', `${formType}_submitMessage`);
                    },
                    { enableHighAccuracy: true, timeout: 10000 }
                );
            } else {
                showMessage('error', 'Geolocation is not supported by this browser.', `${formType}_submitMessage`);
            }
        }

        // Calculate grid assignment (simplified version)
        async function calculateGridAssignment(lat, lon, formType) {
            try {
                const response = await fetch(
                    `${SUPABASE_URL}/rest/v1/Spatial_grid?min_lat=lte.${lat}&max_lat=gt.${lat}&min_lon=lte.${lon}&max_lon=gt.${lon}&select=grid_id,management_zone`,
                    {
                        headers: {
                            'apikey': SUPABASE_ANON_KEY,
                            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
                        }
                    }
                );
                
                const data = await response.json();
                const gridInfo = document.getElementById(`${formType}_gridInfo`);
                const gridText = document.getElementById(`${formType}_gridText`);
                
                if (data && data.length > 0) {
                    gridText.textContent = `${data[0].grid_id} (${data[0].management_zone})`;
                    gridInfo.classList.remove('hidden');
                } else {
                    gridText.textContent = 'OUTSIDE_GRID (Outside Study Area)';
                    gridInfo.classList.remove('hidden');
                }
            } catch (error) {
                console.log('Grid assignment failed:', error);
                // Don't show error to user, just continue without grid info
            }
        }

        // Message display function
        function showMessage(type, message, containerId) {
            const container = document.getElementById(containerId);
            if (!container) return;
            
            const className = type === 'success' ? 'success-message' : 'error-message';
            const icon = type === 'success' ? '✅' : '❌';
            
            container.innerHTML = `<div class="${className}">${icon} ${message}</div>`;
            
            // Clear message after 5 seconds
            setTimeout(() => {
                container.innerHTML = '';
            }, 5000);
        }

        // Generic form submission function
        async function submitFormData(tableName, formData, messageContainerId) {
            const container = document.getElementById(messageContainerId);
            container.innerHTML = '<div style="color: #007bff; padding: 15px;">📤 Submitting data...</div>';
            
            try {
                const response = await fetch(`${SUPABASE_URL}/rest/v1/${tableName}`, {
                    method: 'POST',
                    headers: {
                        'apikey': SUPABASE_ANON_KEY,
                        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                        'Content-Type': 'application/json',
                        'Prefer': 'return=minimal'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    showMessage('success', 'Data submitted successfully!', messageContainerId);
                    return true;
                } else {
                    const errorText = await response.text();
                    throw new Error(`HTTP ${response.status}: ${errorText}`);
                }
            } catch (error) {
                console.error('Submission error:', error);
                showMessage('error', `Submission failed: ${error.message}`, messageContainerId);
                return false;
            }
        }

        // Species form submission
        async function submitSpeciesData() {
            const formData = {
                observation_id: `FIELD_${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}`,
                latitude: parseFloat(document.getElementById('species_latitude').value),
                longitude: parseFloat(document.getElementById('species_longitude').value),
                species_name: document.getElementById('speciesName').value,
                category: document.getElementById('category').value,
                observation_count: parseInt(document.getElementById('observationCount').value),
                source_file: 'Web_Form_Collection',
                survey_site: document.getElementById('surveySite').value,
                observation_date: document.getElementById('observationDate').value,
                observation_time: document.getElementById('observationTime').value,
                data_type: 'field_observation',
                dashboard: 'species_occurrence',
                observer_name: document.getElementById('observerName').value,
                notes: document.getElementById('species_notes').value
            };

            // Validation
            if (!formData.observer_name || !formData.latitude || !formData.longitude || 
                !formData.species_name || !formData.category) {
                showMessage('error', 'Please fill in all required fields marked with *', 'species_submitMessage');
                return;
            }

            const success = await submitFormData('Species_observation', formData, 'species_submitMessage');
            if (success) {
                // Clear form
                document.getElementById('observerName').value = '';
                document.getElementById('species_latitude').value = '';
                document.getElementById('species_longitude').value = '';
                document.getElementById('speciesName').value = '';
                document.getElementById('category').value = '';
                document.getElementById('observationCount').value = '1';
                document.getElementById('surveySite').value = '';
                document.getElementById('species_notes').value = '';
                document.getElementById('species_gridInfo').classList.add('hidden');
            }
        }

        // Water quality form submission
        async function submitWaterData() {
            const formData = {
                test_id: `WATER_${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}`,
                latitude: parseFloat(document.getElementById('water_latitude').value),
                longitude: parseFloat(document.getElementById('water_longitude').value),
                waterbody_name: document.getElementById('waterbodyName').value,
                surveyor: document.getElementById('water_surveyorName').value,
                test_date: document.getElementById('water_testDate').value,
                test_time: document.getElementById('water_testTime').value,
                air_temperature: parseFloat(document.getElementById('airTemperature').value) || null,
                wind_speed: document.getElementById('windSpeed').value,
                ph: parseFloat(document.getElementById('ph').value) || null,
                water_clarity_m: document.getElementById('waterClarity').value,
                depth_m: document.getElementById('water_depth').value,
                water_temperature_c: parseFloat(document.getElementById('waterTemperature').value) || null,
                dissolved_oxygen_percent: parseFloat(document.getElementById('dissolvedOxygenPercent').value) || null,
                dissolved_oxygen_mg_l: parseFloat(document.getElementById('dissolvedOxygenMgL').value) || null,
                notes: document.getElementById('water_notes').value,
                data_type: 'field_water_quality',
                dashboard: 'lake_testing'
            };

            // Validation
            if (!formData.surveyor || !formData.latitude || !formData.longitude || !formData.waterbody_name) {
                showMessage('error', 'Please fill in all required fields marked with *', 'water_submitMessage');
                return;
            }

            const success = await submitFormData('lake_testing', formData, 'water_submitMessage');
            if (success) {
                // Clear form
                document.getElementById('water_surveyorName').value = '';
                document.getElementById('water_latitude').value = '';
                document.getElementById('water_longitude').value = '';
                document.getElementById('waterbodyName').value = '';
                document.getElementById('airTemperature').value = '';
                document.getElementById('windSpeed').value = '';
                document.getElementById('ph').value = '';
                document.getElementById('waterClarity').value = '';
                document.getElementById('water_depth').value = '';
                document.getElementById('waterTemperature').value = '';
                document.getElementById('dissolvedOxygenPercent').value = '';
                document.getElementById('dissolvedOxygenMgL').value = '';
                document.getElementById('water_notes').value = '';
                document.getElementById('water_gridInfo').classList.add('hidden');
            }
        }

        // SAR form submission
        async function submitSARData() {
            const formData = {
                sar_id: `SAR_${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}`,
                latitude: parseFloat(document.getElementById('sar_latitude').value),
                longitude: parseFloat(document.getElementById('sar_longitude').value),
                survey_site: document.getElementById('sar_surveySite').value,
                habitat_number: parseInt(document.getElementById('sar_habitatNumber').value) || null,
                polygon_number: document.getElementById('sar_polygonNumber').value,
                survey_date: document.getElementById('sar_surveyDate').value,
                species_name: document.getElementById('sar_speciesName').value,
                scientific_name: document.getElementById('sar_scientificName').value,
                species_count: parseInt(document.getElementById('sar_speciesCount').value),
                category: document.getElementById('sar_category').value,
                conservation_status: document.getElementById('sar_conservationStatus').value,
                provincial_designation: document.getElementById('sar_provincialDesignation').value,
                federal_designation: document.getElementById('sar_federalDesignation').value,
                risk_level: document.getElementById('sar_riskLevel').value,
                protection_status: document.getElementById('sar_protectionStatus').value,
                observer_name: document.getElementById('sar_observerName').value,
                notes: document.getElementById('sar_notes').value,
                source_file: 'Web_Form_Collection',
                data_type: 'field_sar_observation',
                dashboard: 'sar'
            };

            // Validation
            if (!formData.observer_name || !formData.latitude || !formData.longitude || 
                !formData.species_name || !formData.conservation_status) {
                showMessage('error', 'Please fill in all required fields marked with *', 'sar_submitMessage');
                return;
            }

            const success = await submitFormData('SAR_observations', formData, 'sar_submitMessage');
            if (success) {
                // Clear form
                document.getElementById('sar_observerName').value = '';
                document.getElementById('sar_latitude').value = '';
                document.getElementById('sar_longitude').value = '';
                document.getElementById('sar_surveySite').value = '';
                document.getElementById('sar_habitatNumber').value = '';
                document.getElementById('sar_polygonNumber').value = '';
                document.getElementById('sar_speciesName').value = '';
                document.getElementById('sar_scientificName').value = '';
                document.getElementById('sar_speciesCount').value = '1';
                document.getElementById('sar_category').value = '';
                document.getElementById('sar_conservationStatus').value = '';
                document.getElementById('sar_provincialDesignation').value = '';
                document.getElementById('sar_federalDesignation').value = '';
                document.getElementById('sar_riskLevel').value = '';
                document.getElementById('sar_protectionStatus').value = '';
                document.getElementById('sar_notes').value = '';
                document.getElementById('sar_gridInfo').classList.add('hidden');
            }
        }

        // Habitat form submission
        async function submitHabitatData() {
            const formData = {
                habitat_id: `HABITAT_${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}`,
                latitude: parseFloat(document.getElementById('habitat_latitude').value),
                longitude: parseFloat(document.getElementById('habitat_longitude').value),
                survey_site: parseInt(document.getElementById('habitat_surveySite').value) || null,
                habitat_number: parseInt(document.getElementById('habitat_habitatNumber').value) || null,
                polygon_number: document.getElementById('habitat_polygonNumber').value,
                survey_date: document.getElementById('habitat_surveyDate').value,
                surveyor_initials: document.getElementById('habitat_surveyorInitials').value,
                habitat_type: document.getElementById('habitat_habitatType').value,
                species_name: document.getElementById('habitat_speciesName').value,
                category: document.getElementById('habitat_category').value,
                notes: document.getElementById('habitat_notes').value,
                source_file: 'Web_Form_Collection',
                data_type: 'field_habitat_assessment',
                dashboard: 'habitat_inventory'
            };

            // Validation
            if (!formData.surveyor_initials || !formData.latitude || !formData.longitude || !formData.habitat_type) {
                showMessage('error', 'Please fill in all required fields marked with *', 'habitat_submitMessage');
                return;
            }

            const success = await submitFormData('habitat_inventory', formData, 'habitat_submitMessage');
            if (success) {
                // Clear form
                document.getElementById('habitat_surveyorInitials').value = '';
                document.getElementById('habitat_latitude').value = '';
                document.getElementById('habitat_longitude').value = '';
                document.getElementById('habitat_surveySite').value = '';
                document.getElementById('habitat_habitatNumber').value = '';
                document.getElementById('habitat_polygonNumber').value = '';
                document.getElementById('habitat_habitatType').value = '';
                document.getElementById('habitat_speciesName').value = '';
                document.getElementById('habitat_category').value = '';
                document.getElementById('habitat_notes').value = '';
                document.getElementById('habitat_gridInfo').classList.add('hidden');
            }
        }

        // Bathymetry form submission
        async function submitBathymetryData() {
            const formData = {
                measurement_id: `BATHY_${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}`,
                latitude: parseFloat(document.getElementById('bathymetry_latitude').value),
                longitude: parseFloat(document.getElementById('bathymetry_longitude').value),
                lake_name: document.getElementById('bathymetry_lakeName').value,
                depth_m: parseFloat(document.getElementById('bathymetry_depthM').value) || null,
                temperature_c: parseInt(document.getElementById('bathymetry_temperatureC').value) || null,
                survey_date: document.getElementById('bathymetry_surveyDate').value,
                surveyor_name: document.getElementById('bathymetry_surveyorName').value,
                data_quality: document.getElementById('bathymetry_dataQuality').value,
                depth_category: document.getElementById('bathymetry_depthCategory').value,
                temp_category: document.getElementById('bathymetry_tempCategory').value,
                estimated_season: document.getElementById('bathymetry_estimatedSeason').value,
                notes: document.getElementById('bathymetry_notes').value,
                data_type: 'field_bathymetry',
                dashboard: 'bathymetry'
            };

            // Validation
            if (!formData.surveyor_name || !formData.latitude || !formData.longitude || 
                !formData.lake_name || !formData.depth_m) {
                showMessage('error', 'Please fill in all required fields marked with *', 'bathymetry_submitMessage');
                return;
            }

            const success = await submitFormData('bathymetery', formData, 'bathymetry_submitMessage');
            if (success) {
                // Clear form
                document.getElementById('bathymetry_surveyorName').value = '';
                document.getElementById('bathymetry_latitude').value = '';
                document.getElementById('bathymetry_longitude').value = '';
                document.getElementById('bathymetry_lakeName').value = '';
                document.getElementById('bathymetry_depthM').value = '';
                document.getElementById('bathymetry_temperatureC').value = '';
                document.getElementById('bathymetry_dataQuality').value = 'good';
                document.getElementById('bathymetry_depthCategory').value = '';
                document.getElementById('bathymetry_tempCategory').value = '';
                document.getElementById('bathymetry_estimatedSeason').value = '';
                document.getElementById('bathymetry_notes').value = '';
                document.getElementById('bathymetry_gridInfo').classList.add('hidden');
            }
        }

        // Add coordinate validation
        function validateCoordinates(lat, lon) {
            const latitude = parseFloat(lat);
            const longitude = parseFloat(lon);
            
            // Basic Ontario bounds check
            if (latitude >= 42.0 && latitude <= 57.0 && longitude >= -95.0 && longitude <= -74.0) {
                return { valid: true, message: 'Coordinates are within Ontario bounds' };
            } else {
                return { valid: false, message: 'Warning: Coordinates appear to be outside Ontario' };
            }
        }

        // Add coordinate validation on input
        document.addEventListener('input', function(e) {
            if (e.target.id && (e.target.id.includes('latitude') || e.target.id.includes('longitude'))) {
                const formType = e.target.id.split('_')[0];
                const latField = document.getElementById(`${formType}_latitude`) || document.getElementById('species_latitude');
                const lonField = document.getElementById(`${formType}_longitude`) || document.getElementById('species_longitude');
                
                if (latField && lonField && latField.value && lonField.value) {
                    const validation = validateCoordinates(latField.value, lonField.value);
                    if (!validation.valid) {
                        console.log(validation.message);
                    }
                    
                    // Auto-calculate grid assignment
                    calculateGridAssignment(latField.value, lonField.value, formType === 'species' ? 'species' : formType);
                }
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            // Escape key to go back to home
            if (e.key === 'Escape') {
                showHome();
            }
            
            // Ctrl/Cmd + Enter to submit form (if on a form page)
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                const currentForm = document.querySelector('div:not(.hidden)');
                if (currentForm && currentForm.id !== 'homePage') {
                    const submitButton = currentForm.querySelector('.submit-button');
                    if (submitButton) {
                        submitButton.click();
                    }
                }
            }
        });

        // Auto-save functionality (localStorage)
        function autoSave(formType) {
            const form = document.getElementById(`${formType}Form`);
            if (!form) return;
            
            const inputs = form.querySelectorAll('input, select, textarea');
            const data = {};
            
            inputs.forEach(input => {
                if (input.id) {
                    data[input.id] = input.value;
                }
            });
            
            localStorage.setItem(`iesf_${formType}_draft`, JSON.stringify(data));
        }

        function loadDraft(formType) {
            const draft = localStorage.getItem(`iesf_${formType}_draft`);
            if (!draft) return;
            
            try {
                const data = JSON.parse(draft);
                Object.keys(data).forEach(fieldId => {
                    const field = document.getElementById(fieldId);
                    if (field && data[fieldId]) {
                        field.value = data[fieldId];
                    }
                });
            } catch (e) {
                console.log('Could not load draft:', e);
            }
        }

        function clearDraft(formType) {
            localStorage.removeItem(`iesf_${formType}_draft`);
        }

        // Add auto-save listeners
        document.addEventListener('input', function(e) {
            if (e.target.closest('form') || e.target.closest('[id$="Form"]')) {
                const formElement = e.target.closest('[id$="Form"]');
                if (formElement) {
                    const formType = formElement.id.replace('Form', '');
                    autoSave(formType);
                }
            }
        });

        console.log('🌲 IESF Environmental Data Platform loaded successfully!');
        console.log('📱 Use GPS buttons to capture location coordinates');
        console.log('💾 Form data is auto-saved locally while typing');
        console.log('⌨️ Keyboard shortcuts: ESC = Home, Ctrl+Enter = Submit');
    </script>
</body>
</html>
