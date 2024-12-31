import homeIcon from "../assets/Homenv/home.png";
import shortsIcon from "../assets/Homenv/youtube-shorts-icon.png";
import subscriptionIcon from "../assets/Homenv/subscription.png";
import userprofile from"../assets/Homenv/user.png";


function SidebarColls() {
    const menu = [
        {icon : homeIcon , label : "Home"},
        {icon : shortsIcon , label : "Shorts"},
        {icon : subscriptionIcon , label : "Subscription"},
        {icon : userprofile , label : "You"},
    ]
    return (
        <>
        
        <div className="p-4 bg-white h-full">
  <ul className="menu-list flex flex-col items-center space-y-4">
    {menu.map((item, index) => (
      <li 
        key={index} 
        className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition duration-200"
        style={{ width: "70px" }}
      >
        <img src={item.icon} alt={item.label} className="w-4 h-4" />
        <p className="text-xs text-gray-700 font-medium text-center" style={{fontSize:"9px"}}>{item.label}</p>
      </li>
    ))}
  </ul>
</div>


        
        </>
    )
}

export default SidebarColls;