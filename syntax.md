---
layout: page
title: Syntax
permalink: /syntax/
main_menu: b
---

## Syntax

### Act headings

Act headings are single lines starting with a hash. There should be a blank line above and below.

    # Act One

### Scene headings
Like act headings, but they start with a single dot. There should be a blank line above and below.
    
    .Scene 2. The Beginning

### Character lines
Character lines follow a blank line, are in uppercase, and always followed by a colon. Any dialogue must be on a new line. In practice, only the first word need be uppercase, and character lines can contain actor direction. Character lines with lowercase can be forced by starting with an @ symbol:

    NORMAN:
	This is very normal.
	
    HERMANN [to us]:
	This is some dialogue.
	
	@McDONALD:
	Notice the at symbol.
	
	TOM and JERRY:
	I didn't know we could speak.
	
### Dialogue
Dialogue follows a character line, but within dialogue white space is preserved. This means dialogue can be written in paragaphs which is especially useful for long sections. Dialogue can be separated by a direction, and continued without having to repeat the character line.

    TOM:
	[picks up the phone] Hello?
	
	[Pause]
	
	Strange, there's nobody there.

### Direction
All stage direction, scene description, actor direction — in fact pretty much anything that isn't a heading, character or dialogue — is written inside square brackets `[like this]`.

### Page breaks
Any line starting with three equals `===` will be treated as a page break in the output. Any text on the rest of the line will be ignored.

### Comments
This convention is borrowed from computer programming. Text surrounded by `/*` and `*/` will be ignored and not appear in any generated output. This can be useful to insert your own notes, and is especially useful when working collaboratively.

    /*
    All of this will be ignored
    ...
    including new lines
    ...
    */

### Emphasis
Markdown like emphasis is supported. Surround text with single asterisks for italic, double asterisks for bold. Underscores are used for underlining.

    SOPHIE:
	So this is *italic*,
	this is **bold**,
	this is ***bold and italic***
	and this is _underlined_.

### Title page
Metadata can be added at the top of the document. It is started and ended with a line of three hypens. If a title is given, then the output will contain a title page. On the title page, the values for title, credit, and author will be used.

    ---
	title: A Guide to Quill
	credit: written slowly by
	author: Rollo
	date: 12th Feb 2015
	address:
	  Some Place
	  LONDON
	  UK
	---
	
