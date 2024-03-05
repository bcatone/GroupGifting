import { Coco } from './index';
//@ts-ignore
import tinygradient from 'tinygradient';
describe('Default colors', () => {
    test('Defaults to Soft Rainbow', () => {
        var holder = Coco.formatString('----');
        expect(Coco.gradient).toStrictEqual(
            tinygradient(Coco.gradientShorthands.softrainbow)
        );
    });
    test('Setting to Old Movie works', () => {
        Coco.setColor('oldmovie');
        expect(Coco.gradient).toStrictEqual(
            tinygradient(Coco.gradientShorthands.oldmovie)
        );
    });
    test('Setting to Vaporwave works', () => {
        Coco.setColor('vaporwave');
        expect(Coco.gradient).toStrictEqual(
            tinygradient(Coco.gradientShorthands.vaporwave)
        );
    });
});
describe('formatString', () => {
    test('Valid input comes out correctly', () => {
        var holder = Coco.formatString('----');
        expect(holder).not.toBeNull();
    });
    test('Valid input comes out correctly', () => {
        var holder = Coco.formatString('');
        expect(holder).not.toBeNull();
    });
});

