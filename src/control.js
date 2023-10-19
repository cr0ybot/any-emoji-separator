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
import { useCallback, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

export function EmojiPickerControl({
	value = '',
	onChange,
	onCancel,
	...props
}) {
	const [emoji, setEmoji] = useState(value);

	/**
	 * Add the selected emoji to the end of the input value.
	 */
	const handleEmojiClick = useCallback(
		({ emoji: selectedEmoji }) => {
			setEmoji(emoji + selectedEmoji);
		},
		[emoji]
	);

	const handleTextChange = (newEmoji) => {
		setEmoji(newEmoji);
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
						value={emoji}
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
						onClick={() => onChange?.(emoji)}
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
