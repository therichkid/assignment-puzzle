export const swapNodes = (node1: Node, node2: Node): void => {
	const parent2 = <Node>node2.parentNode;
	const next2 = node2.nextSibling;

	if (next2 === node1) {
		parent2.insertBefore(node1, node2);
	} else {
		(node1.parentNode as Node).insertBefore(node2, node1);
		parent2.insertBefore(node1, next2);
	}
};
