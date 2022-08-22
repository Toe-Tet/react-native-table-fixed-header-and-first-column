import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	Animated as Animate,
} from "react-native";
import Animated, {
	runOnJS,
	scrollTo,
	useAnimatedGestureHandler,
	useAnimatedRef,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withDecay,
} from "react-native-reanimated";

export default function App() {
	const [items, setItems] = useState([
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
	]);
	// let leftColumnScrollPosition = useRef(new Animated.Value(0)).current;
	// const leftColumnScrollTranslation = leftColumnScrollPosition.interpolate({
	// 	inputRange: [0, 100],
	// 	outputRange: [0, -100],
	// 	// extrapolate: "clamp",
	// });
	// const leftColumnScrollEvent = Animated.event(
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
	// 		// listener: (event) => {
	// 		// 	console.log(leftColumnScrollTranslation, "event");
	// 		// 	// if (isCloseToBottom(nativeEvent)) {
	// 		// 	// 	irf (nativeEvent.contentOffset.y >= 238) {
	// 		// 	// 		// setLeftColumnScrollEnable(false);
	// 		// 	// 		console.log(
	// 		// 	// 			nativeEvent.contentOffset.y,
	// 		// 	// 			"isCloseToBottom"
	// 		// 	// 		);
	// 		// 	// 	}
	// 		// 	// }
	// 		// 	// rightColumnScrollPosition = leftColumnScrollPosition;
	// 		// },
	// 	}
	// );
	// let rightColumnScrollPosition = useRef(new Animated.Value(0)).current;
	// const rightColumnScrollTranslation = rightColumnScrollPosition.interpolate({
	// 	inputRange: [0, 100],
	// 	outputRange: [0, -100],
	// 	// extrapolate: "clamp",
	// });
	// const rightColumnScrollEvent = Animated.event(
	// 	[
	// 		{
	// 			nativeEvent: {
	// 				contentOffset: {
	// 					y: rightColumnScrollPosition,
	// 				},
	// 			},
	// 		},
	// 	],
	// 	{ useNativeDriver: true }
	// );

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
	const leftRef = useAnimatedRef();
	const rightRef = useAnimatedRef();
	// const [rightStyle, setRightStyle] = useState(styles.rightColumnRows);
	let scrollOffsetLeft = useSharedValue(0);
	let scrollOffsetRight = useSharedValue(0);
	let isScrollInLeft = useSharedValue(0);

	// let scroll = useSharedValue(0);
	// let isScrollEndReach = useSharedValue(0);
	let [isScrollEndReach, setIsScrollEndReach] = useState(false);
	// const [currentScroll, setCurrentScroll] = useState("");

	let leftTransformStyle = useAnimatedStyle(() => {
		return {
			// top: scrollOffsetLeft.value,
			transform: [
				{
					translateY: scrollOffsetLeft.value,
				},
			],
		};
	});
	let rightTransformStyle = useAnimatedStyle(() => {
		return {
			// top: scrollOffsetRight.value,

			transform: [
				{
					translateY: scrollOffsetRight.value,
				},
			],
		};
	});
	// useDerivedValue(() => {
	// 	console.log("derived", scrollOffsetRight.value);
	// 	scrollTo(rightRef, 0, scrollOffsetRight.value, false);
	// });
	const leftScrollHandler = useAnimatedScrollHandler({
		onBeginDrag: (event) => {
			isScrollInLeft.value = 1;
		},
		onScroll: (event) => {
			// if (
			// 	!isScrollEnd(event) ||
			// 	scrollOffsetRight.value <= -event.contentOffset.y
			// ) {
			// 	if (isScrollEndReach.value == 0)
			// 		scrollOffsetRight.value = -event.contentOffset.y;
			// } else {
			// 	isScrollEndReach.value = 1;
			// }
			// if (isCloseToBottom(event)) {
			// 	// runOnJS(setIsScrollEndReach)(true);

			// 	// isScrollEndReach.value = 1;
			// 	console.log(isScrollEndReach, "end");
			// } else {
			// if (!isScrollEndReach)
			// scrollOffsetRight.value = event.contentOffset.y;
			// }
			if (isScrollInLeft.value == 1)
				scrollTo(rightRef, 0, event.contentOffset.y, false);
			// console.log(event);
			console.log(event.contentOffset.y, "left");
		},
	});

	const rightScrollHandler = useAnimatedScrollHandler({
		onBeginDrag: (event) => {
			isScrollInLeft.value = 0;
		},
		onScroll: (event) => {
			// if (
			// 	!isScrollEnd(event) ||
			// 	scrollOffsetRight.value <= -event.contentOffset.y
			// ) {
			// 	if (isScrollEndReach.value == 0)
			// 		scrollOffsetRight.value = -event.contentOffset.y;
			// } else {
			// 	isScrollEndReach.value = 1;
			// }
			// if (isCloseToBottom(event)) {
			// 	// runOnJS(setIsScrollEndReach)(true);

			// 	// isScrollEndReach.value = 1;
			// 	console.log(isScrollEndReach, "end");
			// } else {
			// if (!isScrollEndReach)
			// scrollOffsetRight.value = event.contentOffset.y;
			// }
			if (isScrollInLeft.value == 0)
				scrollTo(leftRef, 0, event.contentOffset.y, false);
			// console.log(event);
			console.log(event.contentOffset.y, "right");
		},
		onEndDrag: (event) => {
			// scrollTo(leftRef, 0, -event.contentOffset.y + 0.1, false);
		},
	});

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
					onScroll={leftScrollHandler}
					ref={leftRef}
					// scrollEnabled={!isScrollEndReach}
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
					// style={{ paddingBottom: 160 }}
				>
					{/* <Animated.View
						ref={leftRef}
						style={[
							styles.leftColumnRows,
							// { paddingBottom: 160 },

							// {
							// 	transform: [
							// 		{
							// 			translateY:
							// 				rightColumnScrollTranslation,
							// 		},
							// 	],
							// },
							leftTransformStyle,
						]}
					> */}
					{items.map((item) => {
						return (
							<View
								key={`left-row-${item}`}
								style={styles.leftColumnRow}
							></View>
						);
					})}
					{/* </Animated.View> */}
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
						ref={rightRef}
						onScroll={rightScrollHandler}
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
						// style={{ flex: 1 }}
						scrollEventThrottle={1}
						bounces={false}
						showsVerticalScrollIndicator={false}
					>
						{/* <Animated.View
							// ref={rightRef}
							style={[
								styles.rightColumnRows,
								{ paddingBottom: 160 },
								// {
								// 	transform: [
								// 		{
								// 			translateY:
								// 				leftColumnScrollTranslation,
								// 		},
								// 	],
								// },
								// rightTransformStyle,
							]}
						> */}
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
						{/* </Animated.View> */}
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
