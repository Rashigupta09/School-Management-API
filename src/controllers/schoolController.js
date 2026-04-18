const { pool } = require('../config/db');
const {
  validateSchoolPayload,
  validateUserCoordinates,
} = require('../utils/validateSchool');
const { calculateDistanceKm } = require('../utils/distance');

async function addSchool(req, res) {
  const { isValid, errors, sanitized } = validateSchoolPayload(req.body);

  if (!isValid) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  try {
    const insertQuery =
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';

    const [result] = await pool.execute(insertQuery, [
      sanitized.name,
      sanitized.address,
      sanitized.latitude,
      sanitized.longitude,
    ]);

    return res.status(201).json({
      success: true,
      message: 'School added successfully',
      data: {
        id: result.insertId,
        ...sanitized,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to add school',
      error: error.message,
    });
  }
}

async function listSchools(req, res) {
  const validation = validateUserCoordinates(req.query);

  if (!validation.isValid) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: validation.errors,
    });
  }

  try {
    const [schools] = await pool.execute(
      'SELECT id, name, address, latitude, longitude FROM schools'
    );

    const sortedSchools = schools
      .map((school) => {
        const distanceKm = calculateDistanceKm(
          validation.latitude,
          validation.longitude,
          Number(school.latitude),
          Number(school.longitude)
        );

        return {
          ...school,
          distanceKm: Number(distanceKm.toFixed(3)),
        };
      })
      .sort((a, b) => a.distanceKm - b.distanceKm);

    return res.status(200).json({
      success: true,
      message: 'Schools fetched successfully',
      userLocation: {
        latitude: validation.latitude,
        longitude: validation.longitude,
      },
      count: sortedSchools.length,
      data: sortedSchools,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch schools',
      error: error.message,
    });
  }
}

module.exports = {
  addSchool,
  listSchools,
};
