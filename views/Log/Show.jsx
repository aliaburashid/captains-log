const React = require('react');

function Show(props) {
    const log = props.log;

    return (
        <html>
            <head>
                <title>{log.title} - Log Details</title>
                <link rel="stylesheet" href="/styles.css" />
            </head>
            <body>
                <div className="show-container">
                    <h1>{log.title}</h1>

                    <p><strong>Entry:</strong> {log.entry}</p>
                    <p><strong>Ship is Broken:</strong> {log.shipIsBroken ? 'Yes ✅' : 'No ❌'}</p>

                    <div className="button-group">
                        <form action={`/log/${log._id}/edit`} method="GET" style={{ display: 'inline' }}>
                            <button className="edit-btn">Edit</button>
                        </form>

                        <form action={`/log/${log._id}?_method=DELETE`} method="POST" style={{ display: 'inline' }}>
                            <button className="delete-btn">Delete</button>
                        </form>
                    </div>

                    <br />
                    <a href="/log">← Back to Logs List</a>
                </div>
            </body>
        </html>
    );
}

module.exports = Show;
