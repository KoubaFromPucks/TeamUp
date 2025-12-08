import React from 'react';
import { Card } from '@/components/card';
import { CardContent, CardHeader } from '@/components/card/card';

const SkeletonLabeledItem = ({
	labelWidthClass,
	children
}: {
	labelWidthClass: string;
	children: React.ReactNode;
}) => (
	<div className="mt-4 text-center">
		<div
			className={`mx-auto mb-2 h-6 animate-pulse rounded bg-gray-200 ${labelWidthClass}`}
		/>
		<hr className="mb-2 border-black" />
		{children}
	</div>
);

const OneLineValue = ({ valueWidthClass }: { valueWidthClass: string }) => (
	<div className="flex min-h-[24px] items-center justify-center gap-2">
		<div className="h-[18px] w-[18px] animate-pulse rounded bg-gray-200" />
		<div
			className={`h-4 animate-pulse rounded bg-gray-200 ${valueWidthClass}`}
		/>
	</div>
);

const TwoLineValue = ({ valueWidthClass }: { valueWidthClass: string }) => (
	<div className="flex min-h-[40px] flex-col items-center justify-center gap-2">
		<div className="flex items-center justify-center gap-2">
			<div className="h-[18px] w-[18px] animate-pulse rounded bg-gray-200" />
			<div
				className={`h-4 animate-pulse rounded bg-gray-200 ${valueWidthClass}`}
			/>
		</div>
		<div
			className={`h-4 animate-pulse rounded bg-gray-200 ${valueWidthClass}`}
		/>
	</div>
);

export const EventCardSkeleton = () => (
	<div className="transition-transform">
		<Card>
			<CardHeader className="flex items-center justify-between text-left">
				<div className="h-5 w-40 animate-pulse rounded bg-gray-200" />
				<div className="h-8 w-16 animate-pulse rounded bg-gray-200" />
			</CardHeader>

			<CardContent className="gap-6">
				<SkeletonLabeledItem labelWidthClass="w-14">
					<TwoLineValue valueWidthClass="w-14" />
				</SkeletonLabeledItem>

				<SkeletonLabeledItem labelWidthClass="w-20">
					<TwoLineValue valueWidthClass="w-18" />
				</SkeletonLabeledItem>

				<SkeletonLabeledItem labelWidthClass="w-24">
					<TwoLineValue valueWidthClass="w-20" />
				</SkeletonLabeledItem>
			</CardContent>
		</Card>
	</div>
);
