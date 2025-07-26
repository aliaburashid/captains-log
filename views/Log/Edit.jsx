const React = require('react');

function Edit(props) {
  const log = props.log;

  return (
    <html>
      <head>
        <title>Edit Log Entry</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <div className="form-container">
          <h1 className="form-title">Edit Captain's Log</h1>

          <form action={`/log/${log._id}?_method=PUT`} method="POST">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={log.title}
              required
            />

            <label htmlFor="entry">Entry:</label>
            <textarea
              id="entry"
              name="entry"
              rows="5"
              defaultValue={log.entry}
              required
            ></textarea>

            <label htmlFor="shipIsBroken">
              Ship is Broken:
              <input
                type="checkbox"
                id="shipIsBroken"
                name="shipIsBroken"
                defaultChecked={log.shipIsBroken}
              />
            </label>

            <input className="form-btn" type="submit" value="Update Log" />
          </form>
        </div>
      </body>
    </html>
  );
}

module.exports = Edit;
