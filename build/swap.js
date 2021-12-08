export const swapNodes = (node1, node2) => {
    const parent2 = node2.parentNode;
    const next2 = node2.nextSibling;
    if (next2 === node1) {
        parent2.insertBefore(node1, node2);
    }
    else {
        node1.parentNode.insertBefore(node2, node1);
        parent2.insertBefore(node1, next2);
    }
};
