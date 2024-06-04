const SERVER_MESSAGE = {
    SERVER_ERROR: 'Server error',
    COVERAGE_NOT_FOUND: 'Coverage not found',
    DISCOUNT_NOT_FOUND: 'Discount not found',
    INSURANCE_SETTINGS_NOT_FOUND: 'Insurance settings not found',
    STARTING_SEEDING: 'Connected to MongoDB. Starting data seed',
    SEED_FINISH_SUCCESS: 'Data seeded successfully',
    SEEDING_ERROR: 'Error seeding data: ',
    MONGO_ATLAS_CONNECTED: 'Connected to MongoDB Atlas',
    DB_CONNECTION_ERROR: 'Database connection error',
    SERVER_RUNNING_ON_PORT: 'Server running on port: ',
    ENV_VARS_MISSING: 'One or more required environment variables are missing.',
    ENV_VARS_MISSING_DETAILED: 'Please make sure to set MONGO_USERNAME, MONGO_PASSWORD, and SERVER_PORT environment variables.'
};

export default SERVER_MESSAGE;
