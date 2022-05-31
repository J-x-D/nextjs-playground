import { TFunction } from 'next-i18next';
import * as Yup from 'yup';
import { AssertsShape, ObjectShape, TypeOfShape } from 'yup/lib/object';
import { AnyObject } from 'yup/lib/types';

export function initValidationSchema(
    t: TFunction
): Yup.ObjectSchema<
    ObjectShape,
    AnyObject,
    TypeOfShape<ObjectShape>,
    AssertsShape<ObjectShape>
> {
    return Yup.object().shape({
        firstname: Yup.string()
            .required(t('common:form.required'))
            .min(3, t('common:form.min'))
            .max(15, t('common:form.max')),
        age: Yup.number()
            .required(t('common:form.required'))
            .min(0, t('common:form.min'))
            .max(new Date().getFullYear(), t('common:form.max')),
        lastname: Yup.string()
            .required(t('common:form.required'))
            .min(3, t('common:form.min'))
            .max(15, t('common:form.max')),
        city: Yup.string()
            .required(t('common:form.required'))
            .min(3, t('common:form.min'))
            .max(15, t('common:form.max')),
        
    });
}
