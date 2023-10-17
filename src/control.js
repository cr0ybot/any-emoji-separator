/**
 * Control.
 */

import EmojiPicker from 'emoji-picker-react';

import {
	BaseControl,
	Button,
	Dropdown,
	Flex,
	FlexBlock,
	FlexItem,
	TextControl,
	ToolbarButton,
} from '@wordpress/components';
import { useRefEffect } from '@wordpress/compose';
import { useRef, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

export function EmojiPickerControl({
	value = '',
	onChange,
	onCancel,
	...props
}) {
	const emojiRef = useRef(value);
	const [emojiState, setEmojiState] = useState(emojiRef.current);

	console.log({
		emoji: emojiRef.current,
		length: emojiRef.current.length,
	});

	/**
	 * Update emojiState when emojiRef changes.
	 */
	useRefEffect(
		(ref) => {
			setEmojiState(ref.current);
		},
		[emojiRef]
	);

	/**
	 * Add the selected emoji to the end of the input value.
	 *
	 * Note: Don't bother with useCallback here. It doesn't work because the
	 * emoji picker is heavily memoized internally and holds on to the first
	 * reference to onEmojiClick so the entire picker doesn't rerender.
	 * Instead, were using a ref to store the current emoji value.
	 *
	 * @see https://github.com/ealush/emoji-picker-react/issues/365
	 */
	const handleEmojiClick = ({ emoji: selectedEmoji }) => {
		const emoji = emojiRef.current;
		console.log(emoji, '+', selectedEmoji);
		console.log(emoji + selectedEmoji);
		emojiRef.current = emoji + selectedEmoji;
		setEmojiState(emojiRef.current);
	};

	const handleTextChange = (newEmoji) => {
		emojiRef.current = newEmoji;
		setEmojiState(newEmoji);
	};

	return (
		<BaseControl
			className="any-emoji-separator-picker"
			label={__('Select emoji to add', 'any-emoji-separator')}
			{...props}
		>
			<Flex className="any-emoji-separator-picker__header">
				<FlexBlock>
					<TextControl
						className="any-emoji-separator-picker__input"
						value={emojiState}
						onChange={handleTextChange}
						placeholder={__(
							'Type any character or emoji',
							'any-emoji-separator'
						)}
					/>
				</FlexBlock>
				<FlexItem>
					<Button
						size="small"
						variant="primary"
						text={__('Apply', 'any-emoji-separator')}
						onClick={() => onChange?.(emojiRef.current)}
					/>
				</FlexItem>
				<FlexItem>
					<Button
						size="small"
						text={__('Cancel', 'any-emoji-separator')}
						onClick={() => onCancel()}
					/>
				</FlexItem>
			</Flex>
			<EmojiPicker
				onEmojiClick={handleEmojiClick}
				emojiStyle="native"
				previewConfig={{ defaultCaption: 'Add anything!' }}
			/>
		</BaseControl>
	);
}

export function EmojiPickerDropdown({ value, onChange, ...props }) {
	return (
		<Dropdown
			className="any-emoji-separator-dropdown"
			contentClassName="any-emoji-separator-dropdown__content"
			position="bottom right"
			expandOnMobile
			renderToggle={({ isOpen, onToggle }) => (
				<ToolbarButton
					className="any-emoji-separator-dropdown__toggle"
					icon="smiley"
					label={__('Select an emoji to add', 'any-emoji-separator')}
					onClick={onToggle}
					isPressed={isOpen}
					aria-expanded={isOpen}
				/>
			)}
			renderContent={({ onToggle }) => (
				<EmojiPickerControl
					value={value}
					onChange={(newValue) => {
						onChange?.(newValue);
						onToggle();
					}}
					onCancel={() => onToggle()}
				/>
			)}
			{...props}
		/>
	);
}

export default EmojiPickerDropdown;
