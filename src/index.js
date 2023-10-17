/**
 * Script entrypoint.
 */

// Import styles for webpack to process.
import './style.scss';
import './editor.scss';

// WordPress dependencies.
import { registerBlockStyle } from '@wordpress/blocks';
import { BlockControls } from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';
import TokenList from '@wordpress/token-list';

// Internal dependencies.
import EmojiPickerDropdown from './control';

/**
 * Register emoji block style for the separator block.
 */
registerBlockStyle('core/separator', {
	name: 'any-emoji',
	label: 'Any Emoji',
});

/**
 * Add a custom attribute to the separator block.
 */
const addAnyEmojiAttribute = (settings, name) => {
	if (name !== 'core/separator') {
		return settings;
	}

	return {
		...settings,
		attributes: {
			...settings.attributes,
			anyEmoji: {
				type: 'string',
				default: '',
			},
		},
	};
};
addFilter(
	'blocks.registerBlockType',
	'any-emoji-separator/add-any-emoji-attribute',
	addAnyEmojiAttribute
);

/**
 * Adds the emoji picker to the separator block.
 */
const withEmojiPickerControl = createHigherOrderComponent(
	(BlockEdit) => (props) => {
		if (props.name !== 'core/separator') {
			return <BlockEdit {...props} />;
		}

		const { attributes, setAttributes } = props;
		const { anyEmoji, className } = attributes;

		// If not the custom style, return the original block edit.
		const classList = new TokenList(className);
		if (!classList.contains('is-style-any-emoji')) {
			return <BlockEdit {...props} />;
		}

		return (
			<>
				<BlockControls group="other">
					<EmojiPickerDropdown
						value={anyEmoji}
						onChange={(emoji) => setAttributes({ anyEmoji: emoji })}
					/>
				</BlockControls>
				<BlockEdit {...props} />
			</>
		);
	},
	'withEmojiPickerControl'
);
addFilter(
	'editor.BlockEdit',
	'any-emoji-separator/with-emoji-picker-control',
	withEmojiPickerControl
);

/**
 * Adds the emoji to the separator block on save via style attribute.
 */
const addAnyEmojiOnSave = (props, blockType, attributes) => {
	if (blockType.name !== 'core/separator') {
		return props;
	}

	const { anyEmoji, className } = attributes;

	// If not the custom style, return the original props.
	const classList = new TokenList(className);
	if (!classList.contains('is-style-any-emoji')) {
		return props;
	}

	const hasEmoji = anyEmoji.length > 0;

	return {
		...props,
		...(hasEmoji ? { style: `--any-emoji: '${anyEmoji}'` } : {}),
	};
};
addFilter(
	'blocks.getSaveContent.extraProps',
	'any-emoji-separator/add-any-emoji-on-save',
	addAnyEmojiOnSave
);

/**
 * Adds the emoji to the separator block in the editor via BlockListBlock filter.
 */
const withAnyEmojiInEditor = createHigherOrderComponent(
	(BlockListBlock) => (props) => {
		if (props.name !== 'core/separator') {
			return <BlockListBlock {...props} />;
		}

		const { attributes } = props;
		const { anyEmoji, className } = attributes;

		// If not the custom style, return the original block edit.
		const classList = new TokenList(className);
		if (!classList.contains('is-style-any-emoji')) {
			return <BlockListBlock {...props} />;
		}

		const hasEmoji = anyEmoji.length > 0;

		return (
			<BlockListBlock
				{...props}
				{...(hasEmoji
					? { wrapperProps: { style: { '--any-emoji': `'${anyEmoji}'` } } }
					: {})}
			/>
		);
	},
	'withAnyEmojiInEditor'
);
addFilter(
	'editor.BlockListBlock',
	'any-emoji-separator/with-any-emoji-in-editor',
	withAnyEmojiInEditor
);
