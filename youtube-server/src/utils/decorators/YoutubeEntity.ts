export type FromData = (obj: Object) => void;

const fromData: FromData = function(data) {
  Object.entries(data).forEach(([key, value]) => (this[key] = value));
};

export const YoutubeEntity = () => target => {
  target.prototype.fromData = fromData;

  return target;
};
