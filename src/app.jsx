import React, { useState } from 'react';
import { ArrowLeft, MapPin, Save, AlertCircle, CheckCircle, Bird, Droplets, Mountain, TreePine, Shield } from 'lucide-react';

// YOUR SUPABASE CREDENTIALS - UPDATE THESE
const SUPABASE_URL = 'https://esyuykkooxyvmtwdyxqv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzeXV5a2tvb3h5dm10d2R5eHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxOTg5MTQsImV4cCI6MjA2OTc3NDkxNH0.OqHPL0h8qQccsPc3jDtGutXOHwVrOZ9avltGpp0qr38';

const IESFDataApp = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [submitStatus, setSubmitStatus] = useState(null);

  // Navigation function
  const navigateTo = (page) => {
    setCurrentPage(page);
    setSubmitStatus(null);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '30px', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <h1 style={{ color: '#2d5016', margin: '0', fontSize: '28px' }}>🌲 IESF Environmental Data Platform</h1>
        <p style={{ color: '#666', margin: '10px 0 0 0' }}>Field Data Collection System</p>
      </div>

      {/* Navigation Bar */}
      {currentPage !== 'home' && (
        <div style={{ marginBottom: '20px' }}>
          <button
            onClick={() => navigateTo('home')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              backgroundColor: '#6c757d', 
              color: 'white', 
              border: 'none', 
              padding: '10px 15px', 
              borderRadius: '5px', 
              cursor: 'pointer' 
            }}
          >
            <ArrowLeft style={{ width: '16px', height: '16px', marginRight: '8px' }} />
            Back to Home
          </button>
        </div>
      )}

      {/* Page Content */}
      {currentPage === 'home' && <HomePage navigateTo={navigateTo} />}
      {currentPage === 'species' && <SpeciesForm navigateTo={navigateTo} submitStatus={submitStatus} setSubmitStatus={setSubmitStatus} />}
      {currentPage === 'water' && <WaterQualityForm navigateTo={navigateTo} submitStatus={submitStatus} setSubmitStatus={setSubmitStatus} />}
      {currentPage === 'sar' && <SARForm navigateTo={navigateTo} submitStatus={submitStatus} setSubmitStatus={setSubmitStatus} />}
      {currentPage === 'habitat' && <HabitatForm navigateTo={navigateTo} submitStatus={submitStatus} setSubmitStatus={setSubmitStatus} />}
      {currentPage === 'bathymetry' && <BathymetryForm navigateTo={navigateTo} submitStatus={submitStatus} setSubmitStatus={setSubmitStatus} />}
    </div>
  );
};

// Homepage with data type selection
const HomePage = ({ navigateTo }) => {
  const dataTypes = [
    {
      id: 'species',
      title: 'Species Observation',
      description: 'Record wildlife sightings and biodiversity data',
      icon: <Bird style={{ width: '40px', height: '40px' }} />,
      color: '#28a745',
      bgColor: '#d4edda'
    },
    {
      id: 'water',
      title: 'Water Quality Testing',
      description: 'Submit water quality measurements and lake testing data',
      icon: <Droplets style={{ width: '40px', height: '40px' }} />,
      color: '#007bff',
      bgColor: '#cce7ff'
    },
    {
      id: 'sar',
      title: 'Species at Risk (SAR)',
      description: 'Report endangered and threatened species observations',
      icon: <Shield style={{ width: '40px', height: '40px' }} />,
      color: '#dc3545',
      bgColor: '#f8d7da'
    },
    {
      id: 'habitat',
      title: 'Habitat Assessment',
      description: 'Document habitat types and ecosystem characteristics',
      icon: <TreePine style={{ width: '40px', height: '40px' }} />,
      color: '#6f42c1',
      bgColor: '#e2d9f3'
    },
    {
      id: 'bathymetry',
      title: 'Bathymetry Data',
      description: 'Submit lake depth and temperature measurements',
      icon: <Mountain style={{ width: '40px', height: '40px' }} />,
      color: '#fd7e14',
      bgColor: '#ffe8d1'
    }
  ];

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#333', marginBottom: '10px' }}>Select Data Type to Submit</h2>
        <p style={{ color: '#666' }}>Choose the type of environmental data you want to record</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {dataTypes.map((type) => (
          <div
            key={type.id}
            onClick={() => navigateTo(type.id)}
            style={{
              backgroundColor: 'white',
              border: `2px solid ${type.color}`,
              borderRadius: '10px',
              padding: '20px',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-5px)';
              e.target.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <div style={{ 
                backgroundColor: type.bgColor, 
                padding: '10px', 
                borderRadius: '50%', 
                marginRight: '15px',
                color: type.color
              }}>
                {type.icon}
              </div>
              <h3 style={{ color: type.color, margin: '0', fontSize: '18px' }}>{type.title}</h3>
            </div>
            <p style={{ color: '#666', margin: '0', lineHeight: '1.5' }}>{type.description}</p>
            <div style={{ 
              marginTop: '15px', 
              padding: '8px 16px', 
              backgroundColor: type.color, 
              color: 'white', 
              borderRadius: '5px', 
              textAlign: 'center',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>
              Start Data Entry →
            </div>
          </div>
        ))}
      </div>

      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '10px', 
        marginTop: '30px',
        border: '1px solid #e0e0e0'
      }}>
        <h3 style={{ color: '#333', marginBottom: '15px' }}>📱 Mobile Instructions</h3>
        <div style={{ color: '#666', lineHeight: '1.6' }}>
          <p><strong>For GPS coordinates:</strong></p>
          <ul style={{ paddingLeft: '20px' }}>
            <li><strong>iPhone:</strong> Open "Compass" app → swipe to see coordinates</li>
            <li><strong>Android:</strong> Open "Google Maps" → long-press your location → coordinates appear</li>
            <li><strong>Format:</strong> Use decimal degrees (e.g., 45.123456, -81.654321)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Common form utilities
const useFormHandler = (initialData, tableName) => {
  const [formData, setFormData] = useState(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gridInfo, setGridInfo] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'latitude' || name === 'longitude') {
      const lat = name === 'latitude' ? value : formData.latitude;
      const lon = name === 'longitude' ? value : formData.longitude;
      if (lat && lon) {
        calculateGridAssignment(lat, lon);
      }
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(6);
          const lon = position.coords.longitude.toFixed(6);
          setFormData(prev => ({ ...prev, latitude: lat, longitude: lon }));
          calculateGridAssignment(lat, lon);
        },
        (error) => alert('Could not get location. Please enter manually.'),
        { enableHighAccuracy: true }
      );
    }
  };

  const calculateGridAssignment = async (lat, lon) => {
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
      if (data && data.length > 0) {
        setGridInfo(data[0]);
      } else {
        setGridInfo({ grid_id: 'OUTSIDE_GRID', management_zone: 'Outside Study Area' });
      }
    } catch (error) {
      setGridInfo({ grid_id: 'UNKNOWN', management_zone: 'Unknown' });
    }
  };

  const submitToSupabase = async (submissionData, setSubmitStatus) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/${tableName}`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submissionData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData(initialData);
        setGridInfo(null);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    setFormData,
    isSubmitting,
    gridInfo,
    handleInputChange,
    getCurrentLocation,
    submitToSupabase
  };
};

// Common components
const FormSection = ({ title, color, children }) => (
  <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: `2px solid ${color}` }}>
    <h3 style={{ color: color, marginBottom: '15px' }}>{title}</h3>
    {children}
  </div>
);

const InputField = ({ label, name, type = 'text', value, onChange, required = false, placeholder, ...props }) => (
  <div style={{ marginBottom: '15px' }}>
    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>
      {label} {required && <span style={{ color: 'red' }}>*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        width: '100%',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '16px',
        boxSizing: 'border-box'
      }}
      {...props}
    />
  </div>
);

const SelectField = ({ label, name, value, onChange, options, required = false }) => (
  <div style={{ marginBottom: '15px' }}>
    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>
      {label} {required && <span style={{ color: 'red' }}>*</span>}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      style={{
        width: '100%',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '16px'
      }}
    >
      <option value="">Select {label.toLowerCase()}...</option>
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

const LocationSection = ({ formData, handleInputChange, getCurrentLocation, gridInfo }) => (
  <FormSection title="📍 Location Information" color="#007bff">
    <button
      onClick={getCurrentLocation}
      style={{
        backgroundColor: '#007bff',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginBottom: '15px',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <MapPin style={{ width: '16px', height: '16px', marginRight: '8px' }} />
      Get GPS Location
    </button>
    
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
      <InputField
        label="Latitude"
        name="latitude"
        type="number"
        value={formData.latitude}
        onChange={handleInputChange}
        placeholder="45.123456"
        step="0.000001"
        required
      />
      <InputField
        label="Longitude"
        name="longitude"
        type="number"
        value={formData.longitude}
        onChange={handleInputChange}
        placeholder="-81.654321"
        step="0.000001"
        required
      />
    </div>
    
    {gridInfo && (
      <div style={{ backgroundColor: '#d4edda', padding: '10px', borderRadius: '4px', marginTop: '10px' }}>
        <strong>Grid Assignment:</strong> {gridInfo.grid_id} ({gridInfo.management_zone})
      </div>
    )}
  </FormSection>
);

const SubmitButton = ({ onSubmit, isSubmitting, isValid, text = "Submit Data" }) => (
  <button
    onClick={onSubmit}
    disabled={isSubmitting || !isValid}
    style={{
      width: '100%',
      padding: '15px',
      backgroundColor: isValid ? '#28a745' : '#cccccc',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '18px',
      cursor: isValid ? 'pointer' : 'not-allowed',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <Save style={{ width: '18px', height: '18px', marginRight: '8px' }} />
    {isSubmitting ? 'Submitting...' : text}
  </button>
);

const StatusMessage = ({ status }) => {
  if (status === 'success') {
    return (
      <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '15px', borderRadius: '4px', marginTop: '20px', display: 'flex', alignItems: 'center' }}>
        <CheckCircle style={{ width: '20px', height: '20px', marginRight: '10px' }} />
        Data submitted successfully!
      </div>
    );
  }
  
  if (status === 'error') {
    return (
      <div style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '15px', borderRadius: '4px', marginTop: '20px', display: 'flex', alignItems: 'center' }}>
        <AlertCircle style={{ width: '20px', height: '20px', marginRight: '10px' }} />
        Submission failed. Please try again.
      </div>
    );
  }
  
  return null;
};

// Species Observation Form
const SpeciesForm = ({ navigateTo, submitStatus, setSubmitStatus }) => {
  const initialData = {
    observerName: '',
    observationDate: new Date().toISOString().split('T')[0],
    observationTime: new Date().toTimeString().slice(0, 5),
    latitude: '',
    longitude: '',
    speciesName: '',
    category: '',
    observationCount: 1,
    surveySite: '',
    notes: ''
  };

  const { formData, isSubmitting, gridInfo, handleInputChange, getCurrentLocation, submitToSupabase } = useFormHandler(initialData, 'Species_observation');

  const handleSubmit = () => {
    const submissionData = {
      observation_id: `FIELD_${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}`,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      grid_id: gridInfo?.grid_id || 'UNKNOWN',
      management_zone: gridInfo?.management_zone || 'Unknown',
      species_name: formData.speciesName,
      category: formData.category,
      observation_count: parseInt(formData.observationCount),
      source_file: 'Web_Form_Collection',
      survey_site: formData.surveySite,
      observation_date: formData.observationDate,
      observation_time: formData.observationTime,
      data_type: 'field_observation',
      dashboard: 'species_occurrence'
    };

    submitToSupabase(submissionData, setSubmitStatus);
  };

  const isFormValid = formData.observerName && formData.latitude && formData.longitude && 
                     formData.speciesName && formData.category;

  return (
    <div>
      <h2 style={{ color: '#28a745', marginBottom: '20px' }}>🦅 Species Observation Form</h2>
      
      <FormSection title="👤 Observer Information" color="#28a745">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
          <InputField
            label="Observer Name"
            name="observerName"
            value={formData.observerName}
            onChange={handleInputChange}
            placeholder="Your name"
            required
          />
          <InputField
            label="Date"
            name="observationDate"
            type="date"
            value={formData.observationDate}
            onChange={handleInputChange}
            required
          />
          <InputField
            label="Time"
            name="observationTime"
            type="time"
            value={formData.observationTime}
            onChange={handleInputChange}
            required
          />
        </div>
      </FormSection>

      <LocationSection 
        formData={formData}
        handleInputChange={handleInputChange}
        getCurrentLocation={getCurrentLocation}
        gridInfo={gridInfo}
      />

      <FormSection title="🦋 Species Information" color="#28a745">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '15px' }}>
          <InputField
            label="Species Name"
            name="speciesName"
            value={formData.speciesName}
            onChange={handleInputChange}
            placeholder="American Robin"
            required
          />
          <SelectField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            options={['Birds', 'Mammals', 'Reptiles', 'Amphibians', 'Fish', 'Insects', 'Other']}
            required
          />
          <InputField
            label="Count"
            name="observationCount"
            type="number"
            value={formData.observationCount}
            onChange={handleInputChange}
            min="1"
            required
          />
        </div>
        
        <InputField
          label="Survey Site Description"
          name="surveySite"
          value={formData.surveySite}
          onChange={handleInputChange}
          placeholder="Near lake shore, forest edge, etc."
        />
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>
            Additional Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            placeholder="Behavior, weather conditions, habitat details, etc."
            rows="3"
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px',
              boxSizing: 'border-box',
              resize: 'vertical'
            }}
          />
        </div>
      </FormSection>

      <SubmitButton
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        isValid={isFormValid}
        text="Submit Species Observation"
      />

      <StatusMessage status={submitStatus} />
    </div>
  );
};

// Water Quality Form
const WaterQualityForm = ({ navigateTo, submitStatus, setSubmitStatus }) => {
  const initialData = {
    surveyorName: '',
    testDate: new Date().toISOString().split('T')[0],
    testTime: new Date().toTimeString().slice(0, 5),
    latitude: '',
    longitude: '',
    waterbodyName: '',
    airTemperature: '',
    windSpeed: '',
    ph: '',
    waterClarity: '',
    depth: '',
    waterTemperature: '',
    dissolvedOxygenPercent: '',
    dissolvedOxygenMgL: '',
    notes: ''
  };

  const { formData, isSubmitting, gridInfo, handleInputChange, getCurrentLocation, submitToSupabase } = useFormHandler(initialData, 'lake_testing');

  const handleSubmit = () => {
    const submissionData = {
      test_id: `WATER_${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}`,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      grid_id: gridInfo?.grid_id || 'UNKNOWN',
      management_zone: gridInfo?.management_zone || 'Unknown',
      waterbody_name: formData.waterbodyName,
      surveyor: formData.surveyorName,
      test_date: formData.testDate,
      test_time: formData.testTime,
      air_temperature: parseFloat(formData.airTemperature) || null,
      wind_speed: formData.windSpeed,
      ph: parseFloat(formData.ph) || null,
      water_clarity_m: formData.waterClarity,
      depth_m: formData.depth,
      water_temperature_c: parseFloat(formData.waterTemperature) || null,
      dissolved_oxygen_percent: parseFloat(formData.dissolvedOxygenPercent) || null,
      dissolved_oxygen_mg_l: parseFloat(formData.dissolvedOxygenMgL) || null,
      notes: formData.notes,
      data_type: 'field_water_quality',
      dashboard: 'lake_testing'
    };

    submitToSupabase(submissionData, setSubmitStatus);
  };

  const isFormValid = formData.surveyorName && formData.latitude && formData.longitude && formData.waterbodyName;

  return (
    <div>
      <h2 style={{ color: '#007bff', marginBottom: '20px' }}>💧 Water Quality Testing Form</h2>
      
      <FormSection title="👤 Surveyor Information" color="#007bff">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
          <InputField
            label="Surveyor Name"
            name="surveyorName"
            value={formData.surveyorName}
            onChange={handleInputChange}
            placeholder="Your name"
            required
          />
          <InputField
            label="Test Date"
            name="testDate"
            type="date"
            value={formData.testDate}
            onChange={handleInputChange}
            required
          />
          <InputField
            label="Test Time"
            name="testTime"
            type="time"
            value={formData.testTime}
            onChange={handleInputChange}
            required
          />
        </div>
      </FormSection>

      <LocationSection 
        formData={formData}
        handleInputChange={handleInputChange}
        getCurrentLocation={getCurrentLocation}
        gridInfo={gridInfo}
      />

      <FormSection title="🏞️ Water Body Information" color="#007bff">
        <InputField
          label="Waterbody Name"
          name="waterbodyName"
          value={formData.waterbodyName}
          onChange={handleInputChange}
          placeholder="Lake name or description"
          required
        />
      </FormSection>

      <FormSection title="🌡️ Environmental Conditions" color="#007bff">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <InputField
            label="Air Temperature (°C)"
            name="airTemperature"
            type="number"
            value={formData.airTemperature}
            onChange={handleInputChange}
            placeholder="20.5"
            step="0.1"
          />
          <SelectField
            label="Wind Conditions"
            name="windSpeed"
            value={formData.windSpeed}
            onChange={handleInputChange}
            options={['Calm', 'Light', 'Moderate', 'Strong']}
          />
        </div>
      </FormSection>

      <FormSection title="🧪 Water Quality Measurements" color="#007bff">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
          <InputField
            label="pH Level"
            name="ph"
            type="number"
            value={formData.ph}
            onChange={handleInputChange}
            placeholder="7.0"
            step="0.1"
            min="0"
            max="14"
          />
          <InputField
            label="Water Clarity (m)"
            name="waterClarity"
            value={formData.waterClarity}
            onChange={handleInputChange}
            placeholder="1.5"
          />
          <InputField
            label="Water Depth (m)"
            name="depth"
            value={formData.depth}
            onChange={handleInputChange}
            placeholder="3.0"
          />
          <InputField
            label="Water Temperature (°C)"
            name="waterTemperature"
            type="number"
            value={formData.waterTemperature}
            onChange={handleInputChange}
            placeholder="15.5"
            step="0.1"
          />
          <InputField
            label="Dissolved Oxygen (%)"
            name="dissolvedOxygenPercent"
            type="number"
            value={formData.dissolvedOxygenPercent}
            onChange={handleInputChange}
            placeholder="85"
            min="0"
            max="100"
          />
          <InputField
            label="Dissolved Oxygen (mg/L)"
            name="dissolvedOxygenMgL"
            type="number"
            value={formData.dissolvedOxygenMgL}
            onChange={handleInputChange}
            placeholder="8.5"
            step="0.1"
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>
            Additional Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            placeholder="Equipment used, weather conditions, observations, etc."
            rows="3"
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px',
              boxSizing: 'border-box',
              resize: 'vertical'
            }}
          />
        </div>
      </FormSection>

      <SubmitButton
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        isValid={isFormValid}
        text="Submit Water Quality Data"
      />

      <StatusMessage status={submitStatus} />
    </div>
  );
};

// SAR Form - Species at Risk
const SARForm = ({ navigateTo, submitStatus, setSubmitStatus }) => {
  const initialData = {
    observerName: '',
    surveyDate: new Date().toISOString().split('T')[0],
    latitude: '',
    longitude: '',
    surveySite: '',
    habitatNumber: '',
    polygonNumber: '',
    speciesName: '',
    scientificName: '',
    speciesCount: 1,
    category: '',
    conservationStatus: '',
    provincialDesignation: '',
    federalDesignation: '',
    riskLevel: '',
    protectionStatus: '',
    notes: ''
  };

  const { formData, isSubmitting, gridInfo, handleInputChange, getCurrentLocation, submitToSupabase } = useFormHandler(initialData, 'SAR_observations');

  const handleSubmit = () => {
    const submissionData = {
      sar_id: `SAR_${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}`,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      grid_id: gridInfo?.grid_id || 'UNKNOWN',
      management_zone: gridInfo?.management_zone || 'Unknown',
      survey_site: formData.surveySite,
      habitat_number: parseInt(formData.habitatNumber) || null,
      polygon_number: formData.polygonNumber,
      survey_date: formData.surveyDate,
      species_name: formData.speciesName,
      scientific_name: formData.scientificName,
      species_count: parseInt(formData.speciesCount),
      category: formData.category,
      conservation_status: formData.conservationStatus,
      provincial_designation: formData.provincialDesignation,
      federal_designation: formData.federalDesignation,
      risk_level: formData.riskLevel,
      protection_status: formData.protectionStatus,
      source_file: 'Web_Form_Collection',
      data_type: 'field_sar_observation',
      dashboard: 'sar'
    };

    submitToSupabase(submissionData, setSubmitStatus);
  };

  const isFormValid = formData.observerName && formData.latitude && formData.longitude && 
                     formData.speciesName && formData.conservationStatus;

  return (
    <div>
      <h2 style={{ color: '#dc3545', marginBottom: '20px' }}>🛡️ Species at Risk (SAR) Form</h2>
      
      <FormSection title="👤 Observer Information" color="#dc3545">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <InputField
            label="Observer Name"
            name="observerName"
            value={formData.observerName}
            onChange={handleInputChange}
            placeholder="Your name"
            required
          />
          <InputField
            label="Survey Date"
            name="surveyDate"
            type="date"
            value={formData.surveyDate}
            onChange={handleInputChange}
            required
          />
        </div>
      </FormSection>

      <LocationSection 
        formData={formData}
        handleInputChange={handleInputChange}
        getCurrentLocation={getCurrentLocation}
        gridInfo={gridInfo}
      />

      <FormSection title="🏞️ Site Information" color="#dc3545">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
          <InputField
            label="Survey Site"
            name="surveySite"
            value={formData.surveySite}
            onChange={handleInputChange}
            placeholder="Site description or name"
          />
          <InputField
            label="Habitat Number"
            name="habitatNumber"
            type="number"
            value={formData.habitatNumber}
            onChange={handleInputChange}
            placeholder="1"
          />
          <InputField
            label="Polygon Number"
            name="polygonNumber"
            value={formData.polygonNumber}
            onChange={handleInputChange}
            placeholder="A1, B2, etc."
          />
        </div>
      </FormSection>

      <FormSection title="🦎 Species Information" color="#dc3545">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
          <InputField
            label="Species Name (Common)"
            name="speciesName"
            value={formData.speciesName}
            onChange={handleInputChange}
            placeholder="Blanding's Turtle"
            required
          />
          <InputField
            label="Scientific Name"
            name="scientificName"
            value={formData.scientificName}
            onChange={handleInputChange}
            placeholder="Emydoidea blandingii"
          />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <InputField
            label="Count Observed"
            name="speciesCount"
            type="number"
            value={formData.speciesCount}
            onChange={handleInputChange}
            min="1"
            required
          />
          <SelectField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            options={['Birds', 'Mammals', 'Reptiles', 'Amphibians', 'Fish', 'Plants', 'Insects', 'Other']}
          />
        </div>
      </FormSection>

      <FormSection title="⚠️ Conservation Status" color="#dc3545">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
          <SelectField
            label="Conservation Status"
            name="conservationStatus"
            value={formData.conservationStatus}
            onChange={handleInputChange}
            options={[
              'Endangered',
              'Threatened', 
              'Special Concern',
              'Vulnerable',
              'Extirpated',
              'At Risk',
              'Unknown'
            ]}
            required
          />
          <SelectField
            label="Risk Level"
            name="riskLevel"
            value={formData.riskLevel}
            onChange={handleInputChange}
            options={['Critical', 'High', 'Medium', 'Low', 'Unknown']}
          />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
          <SelectField
            label="Provincial Designation"
            name="provincialDesignation"
            value={formData.provincialDesignation}
            onChange={handleInputChange}
            options={[
              'Endangered',
              'Threatened',
              'Special Concern',
              'No Status',
              'Not Listed'
            ]}
          />
          <SelectField
            label="Federal Designation"
            name="federalDesignation"
            value={formData.federalDesignation}
            onChange={handleInputChange}
            options={[
              'Endangered',
              'Threatened',
              'Special Concern',
              'No Status',
              'Not Listed'
            ]}
          />
        </div>
        
        <SelectField
          label="Protection Status"
          name="protectionStatus"
          value={formData.protectionStatus}
          onChange={handleInputChange}
          options={[
            'Fully Protected',
            'Partially Protected',
            'No Legal Protection',
            'Under Review',
            'Unknown'
          ]}
        />
        
        <div style={{ marginTop: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>
            Additional Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            placeholder="Behavior, habitat conditions, threats observed, etc."
            rows="3"
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px',
              boxSizing: 'border-box',
              resize: 'vertical'
            }}
          />
        </div>
      </FormSection>

      <div style={{ backgroundColor: '#fff3cd', border: '1px solid #ffeaa7', padding: '15px', borderRadius: '4px', marginBottom: '20px' }}>
        <strong>⚠️ Important:</strong> Species at Risk observations are critical for conservation efforts. 
        Please ensure accurate identification and report any threats or disturbances observed.
      </div>

      <SubmitButton
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        isValid={isFormValid}
        text="Submit SAR Observation"
      />

      <StatusMessage status={submitStatus} />
    </div>
  );
};

// Habitat Assessment Form
const HabitatForm = ({ navigateTo, submitStatus, setSubmitStatus }) => {
  const initialData = {
    surveyorInitials: '',
    surveyDate: new Date().toISOString().split('T')[0],
    latitude: '',
    longitude: '',
    surveySite: '',
    habitatNumber: '',
    polygonNumber: '',
    habitatType: '',
    speciesName: '',
    category: '',
    notes: ''
  };

  const { formData, isSubmitting, gridInfo, handleInputChange, getCurrentLocation, submitToSupabase } = useFormHandler(initialData, 'habitat_inventory');

  const handleSubmit = () => {
    const submissionData = {
      habitat_id: `HABITAT_${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}`,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      grid_id: gridInfo?.grid_id || 'UNKNOWN',
      management_zone: gridInfo?.management_zone || 'Unknown',
      survey_site: parseInt(formData.surveySite) || null,
      habitat_number: parseInt(formData.habitatNumber) || null,
      polygon_number: formData.polygonNumber,
      survey_date: formData.surveyDate,
      surveyor_initials: formData.surveyorInitials,
      habitat_type: formData.habitatType,
      species_name: formData.speciesName,
      category: formData.category,
      notes: formData.notes,
      source_file: 'Web_Form_Collection',
      data_type: 'field_habitat_assessment',
      dashboard: 'habitat_inventory'
    };

    submitToSupabase(submissionData, setSubmitStatus);
  };

  const isFormValid = formData.surveyorInitials && formData.latitude && formData.longitude && formData.habitatType;

  return (
    <div>
      <h2 style={{ color: '#6f42c1', marginBottom: '20px' }}>🌳 Habitat Assessment Form</h2>
      
      <FormSection title="👤 Surveyor Information" color="#6f42c1">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <InputField
            label="Surveyor Initials"
            name="surveyorInitials"
            value={formData.surveyorInitials}
            onChange={handleInputChange}
            placeholder="ABC"
            maxLength="10"
            required
          />
          <InputField
            label="Survey Date"
            name="surveyDate"
            type="date"
            value={formData.surveyDate}
            onChange={handleInputChange}
            required
          />
        </div>
      </FormSection>

      <LocationSection 
        formData={formData}
        handleInputChange={handleInputChange}
        getCurrentLocation={getCurrentLocation}
        gridInfo={gridInfo}
      />

      <FormSection title="🏞️ Site Information" color="#6f42c1">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
          <InputField
            label="Survey Site"
            name="surveySite"
            type="number"
            value={formData.surveySite}
            onChange={handleInputChange}
            placeholder="1"
          />
          <InputField
            label="Habitat Number"
            name="habitatNumber"
            type="number"
            value={formData.habitatNumber}
            onChange={handleInputChange}
            placeholder="1"
          />
          <InputField
            label="Polygon Number"
            name="polygonNumber"
            value={formData.polygonNumber}
            onChange={handleInputChange}
            placeholder="A1, B2, etc."
          />
        </div>
      </FormSection>

      <FormSection title="🌲 Habitat Classification" color="#6f42c1">
        <SelectField
          label="Habitat Type"
          name="habitatType"
          value={formData.habitatType}
          onChange={handleInputChange}
          options={[
            'Deciduous Forest',
            'Coniferous Forest',
            'Mixed Forest',
            'Wetland',
            'Marsh',
            'Swamp',
            'Bog',
            'Fen',
            'Prairie',
            'Meadow',
            'Lake',
            'River',
            'Stream',
            'Rocky Shore',
            'Sandy Shore',
            'Agricultural',
            'Urban',
            'Disturbed',
            'Other'
          ]}
          required
        />
      </FormSection>

      <FormSection title="🦋 Associated Species" color="#6f42c1">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <InputField
            label="Species Observed"
            name="speciesName"
            value={formData.speciesName}
            onChange={handleInputChange}
            placeholder="White-tailed Deer, Red Maple, etc."
          />
          <SelectField
            label="Primary Category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            options={['Birds', 'Mammals', 'Reptiles', 'Amphibians', 'Fish', 'Plants', 'Insects', 'Mixed']}
          />
        </div>
      </FormSection>

      <FormSection title="📝 Habitat Assessment Notes" color="#6f42c1">
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>
            Detailed Habitat Description
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            placeholder="Describe vegetation structure, dominant species, disturbances, management needs, ecological conditions, etc."
            rows="4"
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px',
              boxSizing: 'border-box',
              resize: 'vertical'
            }}
          />
        </div>
      </FormSection>

      <SubmitButton
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        isValid={isFormValid}
        text="Submit Habitat Assessment"
      />

      <StatusMessage status={submitStatus} />
    </div>
  );
};

// Bathymetry Form
const BathymetryForm = ({ navigateTo, submitStatus, setSubmitStatus }) => {
  const initialData = {
    surveyorName: '',
    surveyDate: new Date().toISOString().split('T')[0],
    latitude: '',
    longitude: '',
    lakeName: '',
    depthM: '',
    temperatureC: '',
    dataQuality: 'good',
    depthCategory: '',
    tempCategory: '',
    estimatedSeason: '',
    notes: ''
  };

  const { formData, isSubmitting, gridInfo, handleInputChange, getCurrentLocation, submitToSupabase } = useFormHandler(initialData, 'bathymetery');

  const handleSubmit = () => {
    const submissionData = {
      measurement_id: `BATHY_${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}`,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      grid_id: gridInfo?.grid_id || 'UNKNOWN',
      management_zone: gridInfo?.management_zone || 'Unknown',
      lake_name: formData.lakeName,
      depth_m: parseFloat(formData.depthM) || null,
      temperature_c: parseInt(formData.temperatureC) || null,
      survey_date: formData.surveyDate,
      data_quality: formData.dataQuality,
      depth_category: formData.depthCategory,
      temp_category: formData.tempCategory,
      estimated_season: formData.estimatedSeason,
      data_type: 'field_bathymetry',
      dashboard: 'bathymetry'
    };

    submitToSupabase(submissionData, setSubmitStatus);
  };

  const isFormValid = formData.surveyorName && formData.latitude && formData.longitude && 
                     formData.lakeName && formData.depthM;

  return (
    <div>
      <h2 style={{ color: '#fd7e14', marginBottom: '20px' }}>⛰️ Bathymetry Data Form</h2>
      
      <FormSection title="👤 Surveyor Information" color="#fd7e14">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <InputField
            label="Surveyor Name"
            name="surveyorName"
            value={formData.surveyorName}
            onChange={handleInputChange}
            placeholder="Your name"
            required
          />
          <InputField
            label="Survey Date"
            name="surveyDate"
            type="date"
            value={formData.surveyDate}
            onChange={handleInputChange}
            required
          />
        </div>
      </FormSection>

      <LocationSection 
        formData={formData}
        handleInputChange={handleInputChange}
        getCurrentLocation={getCurrentLocation}
        gridInfo={gridInfo}
      />

      <FormSection title="🏞️ Lake Information" color="#fd7e14">
        <InputField
          label="Lake Name"
          name="lakeName"
          value={formData.lakeName}
          onChange={handleInputChange}
          placeholder="Fish Lake, McFee Lake, etc."
          required
        />
      </FormSection>

      <FormSection title="📏 Measurements" color="#fd7e14">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
          <InputField
            label="Depth (meters)"
            name="depthM"
            type="number"
            value={formData.depthM}
            onChange={handleInputChange}
            placeholder="5.2"
            step="0.1"
            min="0"
            required
          />
          <InputField
            label="Water Temperature (°C)"
            name="temperatureC"
            type="number"
            value={formData.temperatureC}
            onChange={handleInputChange}
            placeholder="15"
            step="1"
          />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
          <SelectField
            label="Data Quality"
            name="dataQuality"
            value={formData.dataQuality}
            onChange={handleInputChange}
            options={['excellent', 'good', 'fair', 'poor']}
          />
          <SelectField
            label="Depth Category"
            name="depthCategory"
            value={formData.depthCategory}
            onChange={handleInputChange}
            options={['shallow', 'medium', 'deep', 'very_deep']}
          />
          <SelectField
            label="Temperature Category"
            name="tempCategory"
            value={formData.tempCategory}
            onChange={handleInputChange}
            options={['cold', 'cool', 'moderate', 'warm']}
          />
        </div>
      </FormSection>

      <FormSection title="🌡️ Environmental Context" color="#fd7e14">
        <SelectField
          label="Estimated Season"
          name="estimatedSeason"
          value={formData.estimatedSeason}
          onChange={handleInputChange}
          options={['spring', 'summer', 'fall', 'winter']}
        />
        
        <div style={{ marginTop: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>
            Additional Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            placeholder="Equipment used, weather conditions, substrate type, vegetation, etc."
            rows="3"
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px',
              boxSizing: 'border-box',
              resize: 'vertical'
            }}
          />
        </div>
      </FormSection>

      <div style={{ backgroundColor: '#cce7ff', border: '1px solid #b8daff', padding: '15px', borderRadius: '4px', marginBottom: '20px' }}>
        <strong>💡 Tip:</strong> For accurate bathymetry mapping, take measurements at regular intervals 
        and record GPS coordinates for each depth reading.
      </div>

      <SubmitButton
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        isValid={isFormValid}
        text="Submit Bathymetry Data"
      />

      <StatusMessage status={submitStatus} />
    </div>
  );
};

export default IESFDataApp;