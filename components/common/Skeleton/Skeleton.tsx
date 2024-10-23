import React from "react";
import { Card, Skeleton } from "@nextui-org/react";

type Props = {
	width?: string;
	height?: string;
	classFirstText?: string;
	classSecondText?: string;
}

export default function App({width, height, classFirstText, classSecondText}: Props) {
	return (
		<div className="flex justify-center pt-8">
			<Card className={width ?? `w-[400px] space-y-5 p-4`} radius="lg">
				<Skeleton className="rounded-lg">
					<div className={`${height ?? 'h-[100px]'} w-[500px] rounded-lg bg-default-300`}></div>
				</Skeleton>
				<div className="space-y-3">
					<Skeleton>
						<div className={classFirstText ?? `h-3 w-3/5 rounded-lg bg-default-200`}></div>
					</Skeleton>
					<Skeleton>
						<div className={classSecondText ?? `h-3 w-4/5 rounded-lg bg-default-200`}></div>
					</Skeleton>
				</div>
			</Card>
		</div>
	);
}