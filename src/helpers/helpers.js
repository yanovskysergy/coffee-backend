const getMessage = (_message, message) => {
  if (!message) return _message;
  try {
    return JSON.parse(message);
  } catch {
    return message;
  }
};

module.exports.sendBasicError = (res, error) => {
  const { _message, message, errors } = error;

  const response = {
    ...(errors
      ? {
          errors: Object.entries(errors).reduce(
            (acc, [key, { message, kind, properties }]) => {
              acc[key] = { message };
              if (kind === "enum") {
                acc[key].validEnums = properties.enumValues;
              }
              return acc;
            },
            {}
          ),
        }
      : error),
    message: getMessage(_message, message),
  };
  res.status(500).json(response);
};
