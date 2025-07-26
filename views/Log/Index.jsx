const React = require('react');

function Index(props) {
  const logs = props.logs;

  return (
    <html>
      <head>
        <title>Captain's Log</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <h1>🧭 Captain’s Log Entries 🧭</h1>

        <a href="/log/new">➕ Create New Log</a>

        <ul>
          {logs.map((log) => (
            <li key={log._id}>
              <strong>
                <a href={`/log/${log._id}`}>{log.title}</a>
              </strong>{' '}
              - {log.shipIsBroken ? '🚨 Ship is broken' : '✅ Ship is fine'}
              <br />

              <form action={`/log/${log._id}/edit`} method="GET" style={{ display: 'inline' }}>
                <button type="submit">Edit</button>
              </form>

              {' | '}

              <form
                action={`/log/${log._id}?_method=DELETE`}
                method="POST"
                style={{ display: 'inline' }}
              >
                <button type="submit">Delete</button>
              </form>
            </li>
          ))}
        </ul>
      </body>
    </html>
  );
}

module.exports = Index;
