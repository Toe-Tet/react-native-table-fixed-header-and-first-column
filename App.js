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
	const [items, setItems] = useState([1, 2, 3, 4, 5, 6]);

	const leftRef = useAnimatedRef();
	const rightRef = useAnimatedRef();
	let isScrollInLeft = useSharedValue(0);

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

	const leftScrollHandler = useAnimatedScrollHandler({
		onBeginDrag: (event) => {
			isScrollInLeft.value = 1;
		},
		onScroll: (event) => {
			if (isScrollInLeft.value == 1) {
				scrollTo(rightRef, 0, event.contentOffset.y, false);
				if (isCloseToBottom(event)) {
					// runOnJS(setItems)([...items, setItems]);
				}
			}
		},
	});

	const rightScrollHandler = useAnimatedScrollHandler({
		onBeginDrag: (event) => {
			isScrollInLeft.value = 0;
		},
		onScroll: (event) => {
			if (isScrollInLeft.value == 0) {
				scrollTo(leftRef, 0, event.contentOffset.y, false);
				if (isCloseToBottom(event)) {
					// runOnJS(setItems)([...items, setItems]);
				}
			}
		},
	});

	return (
		<View style={styles.container}>
			{/* Left Column */}
			<View style={styles.leftColumn}>
				<View style={styles.leftColumnHeader}></View>
				<Animated.ScrollView
					onScroll={leftScrollHandler}
					ref={leftRef}
					scrollEventThrottle={1}
					bounces={false}
					showsVerticalScrollIndicator={false}
				>
					{items.map((item) => {
						return (
							<View
								key={`left-row-${item}`}
								style={styles.leftColumnRow}
							></View>
						);
					})}
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
						scrollEventThrottle={1}
						bounces={false}
						showsVerticalScrollIndicator={false}
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
