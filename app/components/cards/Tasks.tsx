type TasksProps = {
  visible: boolean;
  opacity: number;
};
function TasksCard({ visible, opacity }: TasksProps) {
  if (!visible) return null;
  return (
    <div
      data-swapy-item="first"
      className={`      card bg-[rgba(255,255,255,0.09)] px-[32px] h-full py-[24px] rounded-3xl  border border-[rgba(255,255,255,.1)] backdrop-blur-[5.7px] transition-opacity duration-300 ease-in-out
  
        ${opacity === 100 ? 'opacity-100' : 'opacity-0'}
      `}
    >
      <div className="flex flex-col gap-[16px]">
        <h6 className="font-bold font-manrope text-h6 text-white">Tasks</h6>
        <div className="flex items-center gap-[8px]">
          <h1>Tasks</h1>
        </div>
      </div>
    </div>
  );
}
export default TasksCard;
