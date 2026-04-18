function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isValidLatitude(value) {
  const latitude = Number(value);
  return Number.isFinite(latitude) && latitude >= -90 && latitude <= 90;
}

function isValidLongitude(value) {
  const longitude = Number(value);
  return Number.isFinite(longitude) && longitude >= -180 && longitude <= 180;
}

function validateSchoolPayload(payload) {
  const errors = [];

  if (!isNonEmptyString(payload.name)) {
    errors.push('name must be a non-empty string');
  }

  if (!isNonEmptyString(payload.address)) {
    errors.push('address must be a non-empty string');
  }

  if (!isValidLatitude(payload.latitude)) {
    errors.push('latitude must be a number between -90 and 90');
  }

  if (!isValidLongitude(payload.longitude)) {
    errors.push('longitude must be a number between -180 and 180');
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitized: {
      name: typeof payload.name === 'string' ? payload.name.trim() : payload.name,
      address: typeof payload.address === 'string' ? payload.address.trim() : payload.address,
      latitude: Number(payload.latitude),
      longitude: Number(payload.longitude),
    },
  };
}

function validateUserCoordinates(query) {
  const errors = [];

  if (!isValidLatitude(query.latitude)) {
    errors.push('latitude query parameter must be between -90 and 90');
  }

  if (!isValidLongitude(query.longitude)) {
    errors.push('longitude query parameter must be between -180 and 180');
  }

  return {
    isValid: errors.length === 0,
    errors,
    latitude: Number(query.latitude),
    longitude: Number(query.longitude),
  };
}

module.exports = {
  validateSchoolPayload,
  validateUserCoordinates,
};
