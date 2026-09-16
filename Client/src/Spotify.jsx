import { useEffect } from "react";

export function Spotify() {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://open.spotify.com/embed/iframe-api/v1";

    document.body.appendChild(script);

    window.onSpotifyIframeApiReady = (IFrameAPI) => {
      const element = document.getElementById("embed-iframe");
      const options = {
        width: "100%",
        height: "160",
        uri: "spotify:track:64iEJnhPwqIJLzf1sUaUyQ",
      };
      const callback = (EmbedController) => {
        document.querySelectorAll(".episode").forEach((episode) => {
          episode.addEventListener("click", () => {
            EmbedController.loadEntity(episode.dataset.spotifyId);
          });
        });
      };
      IFrameAPI.createController(element, options, callback);
    };
  }, []);

  return (
    <>
      <div id="embed-iframe"></div>
    </>
  );
}
