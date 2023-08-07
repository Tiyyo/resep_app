const isEmptyObject = (obj: any) => {
  const bool = Object.keys(obj).length > 0;
  return !bool;

};

export default isEmptyObject;