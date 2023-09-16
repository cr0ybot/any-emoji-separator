=== Any Emoji Separator ===
Contributors:      cr0ybot
Tags:              block
Tested up to:      6.1
Stable tag:        0.1.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Add any emoji to the core separator block.

== Description ==

An extension of an idea from (Justin Tadlock)[https://profiles.wordpress.org/greenshady/]'s Beyond Block Styles series of posts on the Make WordPress Developer blog, in particular the [part 3 article](https://developer.wordpress.org/news/2023/08/beyond-block-styles-part-3-building-custom-design-tools/) about creating a custom control for the core separator block.

We talked about his articles and the idea for this proof of concept on [In The Loop podcast, episode 28](https://blackbird.digital/podcast/28-writing-block-themes-with-justin-tadlock/).

This plugin adds a new control to the core separator block that allows you to select any emoji or character available to your system to decorate the separator. In fact, you can add multiple emojis, even an entire word. This is accomplished with a data attribute on the block that is then used to add the text to the block's output.

Please note that using this plugin and then uninstalling it will cause the blocks with emojis to become invalid in the editor. They can be fixed by choosing "Attempt block recovery", but the custom emoji will be lost.

This plugin is meant to be a proof of concept and is not intended for production use. It is not guaranteed to be maintained or updated.

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/any-emoji-separator` directory, or install the plugin through the WordPress plugins screen directly.
1. Activate the plugin through the 'Plugins' screen in WordPress

== Frequently Asked Questions ==

= Is this better than Justin's version? =

Not necessarily. Justin's version is meant for use in a theme and intended to pass theme review (i.e. not break the block if a theme is uninstalled). It is accomplished by using the block's className attribute, meaning that the block won't break if the theme/plugin is removed. However, this limits the number of emojis that can be used to the number of classes that are added to the theme. This plugin uses a data attribute on the block, which allows for more emojis to be used, but will break if the plugin is removed.

= Why doesn't it look like the one Justin made? =

As a proof of concept, this accomplishes the goal of adding any emojis while also being a plugin and *not* a theme. Therefore, it focuses on the functionality instead of the presentation to be as compatible with as many themes as possible.

== Screenshots ==

1. This screen shot description corresponds to screenshot-1.(png|jpg|jpeg|gif). Note that the screenshot is taken from
the /assets directory or the directory that contains the stable readme.txt (tags or trunk). Screenshots in the /assets
directory take precedence. For example, `/assets/screenshot-1.png` would win over `/tags/4.3/screenshot-1.png`
(or jpg, jpeg, gif).
2. This is the second screen shot

== Changelog ==

= 0.1.0 =
* Prerelease
