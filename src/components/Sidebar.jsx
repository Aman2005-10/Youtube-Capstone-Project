import React from "react";
import { Link } from "react-router-dom"; // Ensure the Link is imported from react-router-dom
import homeIcon from "../assets/Homenv/home.png";
import shortsIcon from "../assets/Homenv/youtube-shorts-icon.png";
import subscriptionIcon from "../assets/Homenv/subscription.png";
import histroyIcon from "../assets/Younav/history.png";
import playlistIcon from "../assets/Younav/playlist.png";
import YourvideoIcon from "../assets/Younav/video.png";
import podcastIcon from "../assets/Younav/podcast.png";
import WatchLatericon from "../assets/Younav/clock.png";
import trendingIcon from "../assets/Explore/trending.png";
import shoppingicon from "../assets/Explore/bag.png";
import liveicon from "../assets/Explore/live.png";
import gameicon from "../assets/Explore/game-controller.png";
import footballicon from "../assets/Explore/football.png";
import settingicon from "../assets/setingpart/setting.png";
import helpicon from "../assets/setingpart/question.png";
import feddbackicon from "../assets/setingpart/reply-message.png";
import reporthistoryicon from "../assets/setingpart/finish.png";

function Sidebar() {
  const sidebarMenu = [
    { icon: homeIcon, label: "Home", path: "/" },
    { icon: shortsIcon, label: "Shorts", path: "#" },
    { icon: subscriptionIcon, label: "Subscription", path: "#" },
  ];

  const SidebarYou = [
    { icon: histroyIcon, label: "History", path: "#" },
    { icon: playlistIcon, label: "Playlist", path: "#" },
    { icon: YourvideoIcon, label: "Your Videos", path: "#" },
    { icon: WatchLatericon, label: "Watch Later", path: "#" },
    { icon: podcastIcon, label: "Podcast", path: "#" },
  ];

  const exploreicon = [
    { icon: trendingIcon, label: "Trending", path: "#" },
    { icon: shoppingicon, label: "Shopping", path: "#" },
    { icon: liveicon, label: "Live", path: "#" },
    { icon: gameicon, label: "Gaming", path: "#" },
    { icon: footballicon, label: "Football", path: "#" },
  ];

  const setingicons = [
    { icon: settingicon, label: "Setting", path: "#" },
    { icon: helpicon, label: "Help", path: "#" },
    { icon: feddbackicon, label: "Feedback", path: "#" },
    { icon: reporthistoryicon, label: "Report History", path: "#" },
  ];

  return (
    <>
      <div>
        <nav className="sidebar">
          <div style={{ width: "200px", marginTop: "10px" }}>
            {sidebarMenu.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 20px",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <img src={item.icon} alt={item.label} width="20" style={{ marginRight: "16px" }} />
                <span style={{ fontSize: "14px", fontWeight: "400", color: "#333" }}>
                  <Link to={item.path}>{item.label}</Link> {/* Use Link here */}
                </span>
              </div>
            ))}
          </div>

          <div>
            <hr style={{ width: "200px", marginTop: "10px" }} />
            <h3 style={{ margin: "10px", fontFamily: "sans-serif", fontSize: "18px" }}>You</h3>
            {SidebarYou.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 20px",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <img src={item.icon} alt={item.label} width="20" style={{ marginRight: "16px" }} />
                <span style={{ fontSize: "14px", fontWeight: "400", color: "#333" }}>
                  <Link to={item.path}>{item.label}</Link> {/* Use Link here */}
                </span>
              </div>
            ))}
          </div>

          <div>
            <hr style={{ width: "200px", marginTop: "10px" }} />
            <h3 style={{ margin: "10px", fontFamily: "sans-serif", fontSize: "18px" }}>Explore</h3>
            {exploreicon.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 20px",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <img src={item.icon} alt={item.label} width="20" style={{ marginRight: "16px" }} />
                <span style={{ fontSize: "14px", fontWeight: "400", color: "#333" }}>
                  <Link to={item.path}>{item.label}</Link> {/* Use Link here */}
                </span>
              </div>
            ))}
          </div>

          <div>
            <hr style={{ width: "200px", marginTop: "10px" }} />
            {setingicons.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 20px",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <img src={item.icon} alt={item.label} width="20" style={{ marginRight: "16px" }} />
                <span style={{ fontSize: "14px", fontWeight: "400", color: "#333" }}>
                  <Link to={item.path}>{item.label}</Link> {/* Use Link here */}
                </span>
              </div>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
