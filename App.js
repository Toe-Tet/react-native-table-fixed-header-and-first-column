import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Animated } from "react-native";
import {
	useAnimatedRef,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
} from "react-native-reanimated";

export default function App() {
	const [items, setItems] = useState([1, 2, 3, 4, 5, 6]);
	let leftColumnScrollPosition = useRef(new Animated.Value(0)).current;
	const leftColumnScrollTranslation = leftColumnScrollPosition.interpolate({
		inputRange: [0, 100],
		outputRange: [0, -100],
		// extrapolate: "clamp",
	});
	const leftColumnScrollEvent = Animated.event(
		[
			{
				nativeEvent: {
					contentOffset: {
						y: leftColumnScrollPosition,
					},
				},
			},
		],
		{
			useNativeDriver: true,
			// listener: (event) => {
			// 	console.log(event.target, "event");
			// 	// if (isCloseToBottom(nativeEvent)) {
			// 	// 	irf (nativeEvent.contentOffset.y >= 238) {
			// 	// 		// setLeftColumnScrollEnable(false);
			// 	// 		console.log(
			// 	// 			nativeEvent.contentOffset.y,
			// 	// 			"isCloseToBottom"
			// 	// 		);
			// 	// 	}
			// 	// }
			// 	// rightColumnScrollPosition = leftColumnScrollPosition;
			// },
		}
	);
	let rightColumnScrollPosition = useRef(new Animated.Value(0)).current;
	const rightColumnScrollTranslation = rightColumnScrollPosition.interpolate({
		inputRange: [0, 100],
		outputRange: [0, -100],
		// extrapolate: "clamp",
	});
	const rightColumnScrollEvent = Animated.event(
		[
			{
				nativeEvent: {
					contentOffset: {
						y: rightColumnScrollPosition,
					},
				},
			},
		],
		{ useNativeDriver: true }
	);

	const isCloseToBottom = ({
		layoutMeasurement,
		contentOffset,
		contentSize,
	}) => {
		"worklet";
		return (
			layoutMeasurement.height + contentOffset.y >=
			contentSize.height - 20
		);
	};

	const isCloseToTop = ({ layoutMeasurement, contentOffset, contentSize }) =>
		contentOffset.y == 0;
	// const leftRef = useAnimatedRef(null);
	// const rightRef = useAnimatedRef(null);
	// const [rightStyle, setRightStyle] = useState(styles.rightColumnRows);
	// let scrollOffsetLeft = useSharedValue(0);
	// let scrollOffsetRight = useSharedValue(0);
	// let isScrollEndReach = useSharedValue(0);
	// const [currentScroll, setCurrentScroll] = useState("");

	// let leftTransformStyle = useAnimatedStyle(() => {
	// 	return {
	// 		transform: [
	// 			{
	// 				translateY: scrollOffsetLeft.value,
	// 			},
	// 		],
	// 	};
	// });
	// let rightTransformStyle = useAnimatedStyle(() => {
	// 	return {
	// 		transform: [
	// 			{
	// 				translateY: scrollOffsetRight.value,
	// 			},
	// 		],
	// 	};
	// });
	// const leftScrollHandler = useAnimatedScrollHandler((event) => {
	// 	// if (
	// 	// 	!isScrollEnd(event) ||
	// 	// 	scrollOffsetRight.value <= -event.contentOffset.y
	// 	// ) {
	// 	// 	if (isScrollEndReach.value == 0)
	// 	// 		scrollOffsetRight.value = -event.contentOffset.y;
	// 	// } else {
	// 	// 	isScrollEndReach.value = 1;
	// 	// }

	// 	// scrollOffsetLeft.value = -event.contentOffset.y;
	// 	// console.log(event);
	// 	console.log(scrollOffsetRight.value, "left");
	// });
	// const rightScrollHandler = useAnimatedScrollHandler((event) => {
	// 	// if (
	// 	// 	!isScrollEnd(event) ||
	// 	// 	scrollOffsetLeft.value <= -event.contentOffset.y
	// 	// ) {
	// 	// 	if (isScrollEndReach.value == 0)
	// 	// 		scrollOffsetLeft.value = -event.contentOffset.y;
	// 	// } else {
	// 	// 	isScrollEndReach.value = 1;
	// 	// }
	// 	// scrollOffsetRight.value = -event.contentOffset.y;
	// 	// ("worklet");-
	// 	// console.log(isCloseToBottom(event));
	// 	console.log(scrollOffsetLeft.value, "right");
	// });

	// useEffect(() => {
	// 	// console.log(rightColumnScrollPosition., "..rightColumnScrollPosition");
	// 	rightColumnScrollPosition.addListener((position) => {
	// 		console.log(position.value, "right");
	// 		// leftColumnScrollPosition = rightColumnScrollPosition;
	// 	});
	// 	leftColumnScrollPosition.addListener((position) => {
	// 		console.log(position.value, "left");
	// 		// rightColumnScrollPosition = leftColumnScrollPosition;
	// 	});
	// });

	return (
		<View style={styles.container}>
			{/* Left Column */}
			<View style={styles.leftColumn}>
				<View style={styles.leftColumnHeader}></View>
				<Animated.ScrollView
					onScroll={leftColumnScrollEvent}
					// onScrollBeginDrag={({ nativeEvent }) => {
					// 	console.log(-nativeEvent.contentOffset.y, "y");
					// 	scrollOffsetLeft.value = -nativeEvent.contentOffset.y;
					// }}
					// onScroll={Animated.event(
					// 	[
					// 		{
					// 			nativeEvent: {
					// 				contentOffset: {
					// 					y: leftColumnScrollPosition,
					// 				},
					// 			},
					// 		},
					// 	],
					// 	{
					// 		useNativeDriver: false,
					// 		listener: ({ nativeEvent }) => {
					// 			console.log(
					// 				nativeEvent.contentOffset.y,
					// 				"left event"
					// 			);
					// 			scrollOffsetRight.value =
					// 				nativeEvent.contentOffset.y;
					// 			// rightRef.current.scrollTo({
					// 			// 	y: nativeEvent.contentOffset.y,
					// 			// });
					// 			// setCurrentScroll("left");
					// 			// rightRef.current.setNativeProps({
					// 			// 	style: {
					// 			// 		...styles.rightColumnRows,
					// 			// 		transform: [
					// 			// 			{
					// 			// 				translateY:
					// 			// 					leftColumnScrollTranslation,
					// 			// 			},
					// 			// 		],
					// 			// 	},
					// 			// });
					// 			//  {
					// 			// 	...styles.rightColumnRows,
					// 			// 	backgroundColor: "aqua",
					// 			// 	// transform: [
					// 			// 	// 	{
					// 			// 	// 		contentOffset:
					// 			// 	// 			nativeEvent.contentOffset.y,
					// 			// 	// 	},
					// 			// 	// ],
					// 			// }
					// 		},
					// 	}
					// )}
					// onScroll={({
					// 	nativeEvent: {
					// 		contentOffset: { y },
					// 	},
					// }) => {
					// 	leftColumnScrollPosition.setValue(y);
					// }}
					scrollEventThrottle={1}
					bounces={false}
					showsVerticalScrollIndicator={false}
				>
					<Animated.View
						style={[
							styles.leftColumnRows,
							{
								transform: [
									{
										translateY:
											rightColumnScrollTranslation,
									},
								],
							},
							// leftTransformStyle
						]}
					>
						{items.map((item) => {
							return (
								<View
									key={`left-row-${item}`}
									style={styles.leftColumnRow}
								></View>
							);
						})}
					</Animated.View>
				</Animated.ScrollView>
			</View>
			{/* Right Column */}
			<ScrollView horizontal={true} bounces={false}>
				<View style={styles.rightColumn}>
					<View style={styles.rightColumnHeader}>
						{items.map((i) => {
							return (
								<View
									key={`right-column-header-item-${i}`}
									style={styles.rightColumnHeaderItem}
								></View>
							);
						})}
					</View>
					<Animated.ScrollView
						onScroll={rightColumnScrollEvent}
						// onScrollBeginDrag={({ nativeEvent }) => {
						// 	console.log(-nativeEvent.contentOffset.y, "y");
						// 	scrollOffsetRight.value =
						// 		-nativeEvent.contentOffset.y;
						// }}
						// onScroll={Animated.event(
						// 	[
						// 		{
						// 			nativeEvent: {
						// 				contentOffset: {
						// 					y: leftColumnScrollPosition,
						// 				},
						// 			},
						// 		},
						// 	],
						// 	{
						// 		useNativeDriver: true,
						// 		listener: ({ nativeEvent }) => {
						// 			console.log(
						// 				nativeEvent.contentOffset.y,
						// 				"right event"
						// 			);
						// 			// rightRef.current.setNativeProps({
						// 			// 	style: {
						// 			// 		...styles.rightColumnRows,
						// 			// 		transform: [
						// 			// 			{
						// 			// 				translateY: 0,
						// 			// 			},
						// 			// 		],
						// 			// 	},
						// 			// });
						// 		},
						// 	}
						// )}
						scrollEventThrottle={1}
						bounces={false}
						showsVerticalScrollIndicator={false}
					>
						<Animated.View
							// ref={rightRef}
							style={[
								styles.rightColumnRows,
								{
									transform: [
										{
											translateY:
												leftColumnScrollTranslation,
										},
									],
								},
							]}
						>
							{items.map((item) => {
								return (
									<View
										key={`right-column-row-${item}`}
										style={styles.rightColumnRow}
									>
										{items.map((i) => {
											return (
												<View
													key={`right-column-row-item-${i}`}
													style={
														styles.rightColumnRowItem
													}
												></View>
											);
										})}
									</View>
								);
							})}
						</Animated.View>
					</Animated.ScrollView>
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 40,
		flex: 1,
		flexDirection: "row",
		backgroundColor: "blue",
	},
	leftColumn: {
		backgroundColor: "red",
		// flex: 1,
		// width: 150,
		// height: "100%",r
	},
	rightColumn: {
		// flex: 1,
		// width: "100%",
		backgroundColor: "green",
		height: "100%",
		// width: 150,
	},
	leftColumnHeader: {
		backgroundColor: "pink",
		width: 150,
		height: 50,
	},
	rightColumnHeader: {
		flexDirection: "row",
		height: 50,
		zIndex: 1,
	},
	leftColumnRows: {
		flex: 1,
	},
	rightColumnRows: {
		flex: 1,
	},
	leftColumnRow: {
		height: 150,
		backgroundColor: "orange",
		borderWidth: 1,
		borderColor: "grey",
	},
	rightColumnRow: {
		flexDirection: "row",
		height: 150,
	},
	rightColumnRowItem: {
		height: 150,
		width: 100,
		borderWidth: 1,
		backgroundColor: "yellow",
		borderColor: "grey",
	},
	rightColumnHeaderItem: {
		height: 50,
		width: 100,
		borderWidth: 1,
		backgroundColor: "white",
		borderColor: "grey",
	},
});
