export const getVideoEmbedUrl = (url: string) => {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const videoID = url.includes("youtu.be") ? url.split("youtu.be/")[1] : url.split("v=")[1];

    return `https://www.youtube.com/embed/${videoID}`;
  } else if (url.includes("vimeo.com")) {
    const vimeoId = url.split("vimeo.com/")[1];
    return `https://player.vimeo.com/video/${vimeoId}`;
  }
  return url;
};
