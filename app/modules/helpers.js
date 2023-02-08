const { promises: fs } = require( 'fs' )
const { HOME } = process.env
let has_alerted_user_no_home = false

const log = async ( ...messages ) => {

    // Log to console
    console.log( ...messages )

    // Log to file if possible
    try {
        if( HOME ) {
            await fs.mkdir( `${ HOME }/.venti/`, { recursive: true } )
            await fs.appendFile( `${ HOME }/.venti/gui.log`, `${ messages.join( '\n' ) }\n`, 'utf8' )
        }
        else if( !has_alerted_user_no_home ) {
            alert( `No HOME variable set, this should never happen` )
            has_alerted_user_no_home = true
        }
    } catch( e ) {
        console.log( `Unable to write logs to file: `, e )
    }
}

const { dialog } = require('electron')
const alert = ( message ) => dialog.showMessageBox( { message } )
const wait = time_in_ms => new Promise( resolve => {
    setTimeout( resolve, time_in_ms )
} )

module.exports = {
    log,
    alert,
    wait
}