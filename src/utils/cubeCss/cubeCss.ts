import type { Props_CubeCSS, Props_CubeCSS_API } from './types';

export function cubeCss(cls: Props_CubeCSS): Props_CubeCSS_API {
    let updatedCubeCss =  createObjectCubeClass(cls);
    return {
        cls: updatedCubeCss,
        combine: combineObjectCubeClassesWrapper(updatedCubeCss),
        to_string: createStringCubeCSSClassWrapper(updatedCubeCss)
    }
}

function propOrDefault<T>(x: T | undefined, def: any): T {
	return x ? x : def;
}

/**
 * @param self -> 1st CubeCss class
 * @param other -> 2nd CubeCss class
 * @summary Converts 2 cubeCss objects into a string which can be used in html
 */
function createStringCubeCSSClass(self: Props_CubeCSS, other: Props_CubeCSS): string {
	return `
        [ ${propOrDefault(self.blockClass, '')} ${propOrDefault(other.blockClass, '')} ] 
        [ ${propOrDefault(self.compostClass, '')} ${propOrDefault(other.compostClass, '')} ] 
        [ ${propOrDefault(self.utilClass, '')} ${propOrDefault(other.utilClass, '')} ]`;
}

/**
 * @param self -> CubeCss object
 * @summary Creates a default cubeCss object
 */
function createObjectCubeClass(self: Props_CubeCSS = {}): Props_CubeCSS {
	return {
		blockClass: '' + propOrDefault(self.blockClass, ''),
		compostClass: '' + propOrDefault(self.compostClass, ''),
		utilClass: '' + propOrDefault(self.utilClass, '')
	};
}

/**
 * @param self -> 1st CubeCss object
 * @param other -> 2nd CubeCss object
 * @summary Combines 2 cubeCss objects
 */
function combineObjectCubeClasses(self: Props_CubeCSS, other: Props_CubeCSS): Props_CubeCSS {
	return {
		blockClass: propOrDefault(self.blockClass, ' ') + ' ' + propOrDefault(other.blockClass, ' '),
		compostClass:
			propOrDefault(self.compostClass, ' ') + ' ' + propOrDefault(other.compostClass, ' '),
		utilClass: propOrDefault(self.utilClass, ' ') + ' ' + propOrDefault(other.utilClass, ' ')
	};
}

function combineObjectCubeClassesWrapper(self: Props_CubeCSS): (other: Props_CubeCSS) => Props_CubeCSS {
    return (other: Props_CubeCSS) => combineObjectCubeClasses(self, other)
}

function createStringCubeCSSClassWrapper(self: Props_CubeCSS): (other: Props_CubeCSS) => string {
    return (other: Props_CubeCSS) => createStringCubeCSSClass(self, other)
}