import { UserButton } from "@clerk/nextjs";

export default function SetupPage() {
	return (
		<>
			
			<div className="p-5">This is a protected route! <UserButton afterSignOutUrl="/" defaultOpen={true} showName={true}/></div>
		</>
	);
}
