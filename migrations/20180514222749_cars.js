
exports.up = function(knex, Promise) {
  return knex
            .schema
            .createTable( 'cars', function( carsTable ) {

                // Primary Key
                carsTable.increments();
                carsTable.string( 'name', 50 ).notNullable();
                carsTable.enu('status', ['0', '1']).notNullable();
                

                carsTable.string( 'license_plate', 250 ).notNullable().unique();
                carsTable.timestamp('created').defaultTo(knex.fn.now());

            } )
               .createTable( 'settings', function( settingsTable ) {
                settingsTable.increments();
                settingsTable.integer( 'car_id').references( 'id' ).inTable( 'cars' );
                settingsTable.enu('lights', ['0', '1','2']).notNullable();
                settingsTable.integer( 'left_signal').notNullable();
                settingsTable.integer( 'right_signal').notNullable();
                settingsTable.enu( 'speed',['0','10', '20', '30', '40', '50', '60']).notNullable();

            } );

};

exports.down = function(knex, Promise) {
  return knex
        .schema
            .dropTableIfExists( 'cars' )
            .dropTableIfExists( 'settings' );
};
