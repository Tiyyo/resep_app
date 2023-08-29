import UserInputError from "~/helpers/errors/user.inputs.error";

const convertStringToNumber = async (values: {
  [key: string]: string | null | undefined;
}) => {
  let copy: { [key: string]: number | null } = {};

  const keys = Object.keys(values);

  keys.forEach((key) => {
    if (values[key] && typeof values[key] === "string") {
      let value = Number(values[key]);
      if (
        isNaN(value) ||
        value < 0 ||
        value === Infinity
        // value === null ||
        // value === undefined
      ) {
        throw new UserInputError("Invalid values", "Values must be positive");
      }
      value.toFixed(1);
      copy[key] = Number(value.toFixed(1));
    } else {
      copy[key] = null;
    }
  });
  return copy;
};

export default convertStringToNumber;
