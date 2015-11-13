Switcheroo Plus
===============

Chrome extension for redirecting

This 'Plus' edition is derived from [Switcheroo](https://chrome.google.com/webstore/detail/switcheroo-redirector/cnmciclhnghalnpfhhleggldniplelbg?hl=en) Chrome extension by ranjez which applies under the GPL3 licence.

Improvements (so far) from original:

- internationalized strings
  Supported languages: English and German yet. If you want to translate this plugin into your own language, edit the messages.json and let me know.
  
- massive GUI improvements
  -- Changed the ugly checkboxes into nice graphical images (thanks to OpenClipart.org for the public domain images!)
  -- tidied up the CSS
  -- some optimizations for the popup mode
  
- enhanced option page

- credits

- RegEx support
  Now, you can differ between string replaces and regular expression replaces. You can enter either just a regex string like 'foobar', you also can specify a full qualified JS regex with switches (i.e. /foobar/ig).
  
- rule import and export  
  You can export and import whole rulesets to JSON text.
  
- You get asked to confirm that you want to delete all your rules.

- technical change: back to jQuery
  As I couldn't see any improvements on the current version of Switcheroo, I turned back to jQuery as this is easier to maintain for me.

