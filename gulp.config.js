module.exports = function() {
    var server = '/**/*.js',
        report = './report/';

    var config = {
        // ALL JS TO VET
        allJs: [
            './app/**/*.js',
            './*.js',
            
         ],
         server: server,
         // TESTS
         mochaTests: [
             'tests/*.js'
         ],

         report: report,

         /**
         * KARMA AND TEST SETTINGS
         */
        specHelpers: [],
        serverIntegrationSpecs: ['./tests/server-integration/**/*.spec.js'],
        /**
         * NODE SETTINGS
         */
         defaultPort: 80,
         nodeServer: './server.js'
    };

    //config.karma = getKarmaOptions();

    return config;

    // UTILITY FUNCTIONS -------------------------------------------------
    //====================================================================

};