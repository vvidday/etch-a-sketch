# etch-a-sketch

Etch-A-Sketch project from The Odin Project (Fundamentals).

Things I learnt from this project:

- More advanced CSS selectors 
  - Specify the position of an element relative to its parent (`first-child`, `last-child`)
  - Not selector (`not(:first-child)`)
  - Child of a parent (`.parent > .child`)

- Prompt function in JS - used together with a do-while loop to validate input.
- Using JS to iteratively generate a CSS grid (e.g for-loop, use index to set `gridColumnStart`)
- Tried implementing a "Mobile-First" approach - designing the site for mobile and adding functionality (in this case - smaller grid percentage / flex layout to display buttons side by side) through min width media queries.
- Toggleable buttons requires some exclusivity logic (check whether other button is active, deactivate if so)
- `mouseenter` event - triggers when the mouse enters the element
- Template Strings - similar to f-strings in python e.g. `` `text ${variable} text` ``