const React = require('react');

function New() {
  return (
    <div>
      <h1>Create New Log Entry</h1>
      <form action="/logs" method="POST">
        <label>Title: </label>
        <input type="text" name="title" required /><br />
        
        <label>Entry: </label>
        <textarea name="entry" rows="5" cols="33" required></textarea><br />
        
        <label>Ship is Broken: </label>
        <input type="checkbox" name="shipIsBroken" /><br />
        
        <input type="submit" value="Create Log" />
      </form>
    </div>
  );
}

module.exports = New;
