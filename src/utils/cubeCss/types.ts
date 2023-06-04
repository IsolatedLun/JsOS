export interface Props_CubeCSS {
	blockClass?: string;
	compostClass?: string;
	utilClass?: string;
}

export interface Props_CubeCSS_API {
    cls: Props_CubeCSS;

	combine: (other: Props_CubeCSS) => Props_CubeCSS;
    to_string: (other: Props_CubeCSS) => string;
}