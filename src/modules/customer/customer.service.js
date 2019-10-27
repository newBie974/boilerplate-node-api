'use strict';

function formatMessage(name) {
  const message = `Hello ${name}`;
  return { message };
}

module.exports = {
  formatMessage,
};
