import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Code,
  HouseLine,
  LightbulbFilament,
  PenNib,
  Question,
  Quotes,
  TerminalWindow,
} from "@phosphor-icons/react/dist/ssr";
import { GITHUB_URI } from "@rp/constants";

const items = [
  {
    title: "Preface",
    url: "/preface",
    icon: <Quotes size={32} />,
  },
  {
    title: "Home",
    url: "/",
    icon: <HouseLine size={32} />,
  },
  {
    title: "Kigotumi",
    url: "/kigotumi",
    icon: <Question size={32} />,
  },
  {
    title: "Bokaboka",
    url: "/bokaboka",
    icon: <LightbulbFilament size={32} />,
  },
  {
    title: "Redit",
    url: "/redit",
    icon: <PenNib size={32} />,
  },
  {
    title: "RTerm",
    url: "/rterm",
    icon: <TerminalWindow size={32} />,
  },
  {
    title: "GitHub",
    url: GITHUB_URI,
    icon: <Code size={32} />,
  },
];

export function RPSidebar() {
  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarContent className="bg-transparent h-full flex justify-center">
        <SidebarGroup className="flex-1 flex flex-col justify-center">
          <SidebarGroupLabel></SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a
                      href={item.url}
                      className="text-red-500 hover:text-blue-500 transition-colors duration-200"
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
