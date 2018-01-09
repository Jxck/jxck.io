registerLayout('flex-box', class {
  *intrinsicSizes(styleMap, children) {
    const childrenSizes = yield children.map((child) => child.intrinsicSizes())
    const maxContentSize = childrenSizes.reduce((sum, childSizes) => sum + childSizes.maxContentContribution, 0)
    const minContentSize = childrenSizes.reduce((max, childSizes) => sum + childSizes.minContentContribution, 0)
    return {maxContentSize, minContentSize}
  }

  *layout(space, children, styleMap, edges, breakToken) {
    const inlineSize = resolveInlineSize(space, styleMap)
    const availableInlineSize = inlineSize - edges.all.inline
    const availableBlockSize  = resolveBlockSize(space, styleMap) - edges.all.block
    const childConstraintSpace = new ConstraintSpace({
      inlineSize: availableInlineSize,
      blockSize: availableBlockSize,
    })

    const unconstrainedChildFragments = yield children.map((child) => child.layoutNextFragment(childConstraintSpace))

    const unconstrainedSizes = []
    const totalSize = unconstrainedChildFragments.reduce((sum, fragment, i) => {
      unconstrainedSizes[i] = fragment.inlineSize
      return sum + fragment.inlineSize
    }, 0)

    // Distribute spare space between children.
    const remainingSpace = Math.max(0, inlineSize - totalSize)
    const extraSpace     = remainingSpace / children.length

    const childFragments = yield children.map((child, i) => {
      return child.layoutNextFragment(new ConstraintSpace({
        inlineSize: unconstrainedSizes[i] + extraSpace,
        inlineSizeFixed: true,
        blockSize: availableBlockSize
      }))
    })

    // Position the fragments.
    let inlineOffset = 0
    let maxChildBlockSize = 0
    for (let fragment of childFragments) {
      fragment.inlineOffset = inlineOffset
      fragment.blockOffset = edges.all.blockStart

      inlineOffset += fragment.inlineSize
      maxChildBlockSize = Math.max(maxChildBlockSize, fragment.blockSize)
    }

    // Resolve our block size.
    const blockSize = resolveBlockSize(space, styleMap, maxChildBlockSize)

    return {
      inlineSize: inlineSize,
      blockSize: blockSize,
      childFragments: childFragments,
    }
  }
})
