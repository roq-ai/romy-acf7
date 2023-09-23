import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getPoetById, updatePoetById } from 'apiSdk/poets';
import { poetValidationSchema } from 'validationSchema/poets';
import { PoetInterface } from 'interfaces/poet';

function PoetEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<PoetInterface>(
    () => (id ? `/poets/${id}` : null),
    () => getPoetById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: PoetInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updatePoetById(id, values);
      mutate(updated);
      resetForm();
      router.push('/poets');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<PoetInterface>({
    initialValues: data,
    validationSchema: poetValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Poets',
              link: '/poets',
            },
            {
              label: 'Update Poet',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Poet
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.name}
            label={'Name'}
            props={{
              name: 'name',
              placeholder: 'Name',
              value: formik.values?.name,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="birth_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Birth Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.birth_date ? new Date(formik.values?.birth_date) : null}
              onChange={(value: Date) => formik.setFieldValue('birth_date', value)}
            />
          </FormControl>
          <FormControl id="death_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Death Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.death_date ? new Date(formik.values?.death_date) : null}
              onChange={(value: Date) => formik.setFieldValue('death_date', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.nationality}
            label={'Nationality'}
            props={{
              name: 'nationality',
              placeholder: 'Nationality',
              value: formik.values?.nationality,
              onChange: formik.handleChange,
            }}
          />

          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/poets')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'poet',
    operation: AccessOperationEnum.UPDATE,
  }),
)(PoetEditPage);
