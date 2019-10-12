'use strict';

function formatMessage(name) {
  const message = 'je suis la dans le Handler';
  return { message, name }
}

module.exports = {
  formatMessage,
};
