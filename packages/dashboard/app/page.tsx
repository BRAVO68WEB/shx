import Button from "@/components/ui/Button";
import {Github} from "lucide-react"

export default function Home() {
  return (
		<main className="flex min-h-screen flex-col items-center justify-center text-center p-24 ">
			<div className="content max-w-3xl flex flex-col gap-2">
				<h1 className="text-5xl text-primary">SHX</h1>
				<p className="text-lg ">
					An platform platform meant to store and share files, images, text and
					URLs with ease
				</p>
				<p className="text-2xl my-8">Coming Soon...</p>
				<p className="text-lg">Find us on:</p>
				<div className="flex items-center justify-evenly">
					<a href="https://github.com/BRAVO68WEB/shx" target="_blank" >
						<Button size="icon" className="icon">
							<Github className="h-8 w-8" />
						</Button>
					</a>
				</div>
			</div>
		</main>
	);
}
