import { cn } from "@nextui-org/theme";

interface SettingsProps {
  isOpen: boolean;
}

function Settings({ isOpen }: SettingsProps) {

  return (
    <div
      className={cn(
        "bg-black h-full absolute right-0 w-[30vw] transition-transform duration-300 ease-in-out z-10",
        isOpen ? "translate-x-[0%]" : "translate-x-[100%]"
      )}
    >
      <h1 className="text-white text-h2 text-center mt-9">Settings</h1>
      <div className="p-10">
        <h3>Settings</h3>
      </div>
    </div>
  );
}

export default Settings;
