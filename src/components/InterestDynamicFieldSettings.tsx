// component for the dynamic field settings
import {
  Card,
  CardContent,
  // MenuItem,
  // Select
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Stack } from "@mui/system";
// import InputLabel from "@mui/material/InputLabel";
// import FormControl from "@mui/material/FormControl";
// import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { IDynamicFields } from "../interfaces/interface";
import LoadingButton from "@mui/lab/LoadingButton";
import TestDNDComponent from "./TestDNDComponent";
// import useGetOrganizationalInterestDynamicFields from "./hooks/useGetOrganizationalInterestDynamicFields.ts";
// import { useParams } from "react-router";
// import useSetOrganizationalInterestDynamicFieldsCommand from "./hooks/useSetOrganizationalInterestDynamicFieldsCommand.ts";
// import { enqueueSnackbar } from "notistack";
// import { InterestDynamicFieldSkeleton } from "./components/InterestDynamicFieldSkeleton.tsx";

export const InterestDynamicFieldSettings = () => {
  const [fields, setFields] = useState<IDynamicFields[]>([]);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  // const { organizationId } = useParams<{ organizationId: string }>();

  // const {
  //   data: dynamicFieldsData,
  //   isLoading,
  //   refetch,
  // } = useGetOrganizationalInterestDynamicFields({
  //   organizationId: organizationId ?? "",
  // });

  // const [setOrganizationInterestDynamicFields, commandResponse] =
  //   useSetOrganizationalInterestDynamicFieldsCommand();

  // useEffect(() => {
  //   if (dynamicFieldsData) {
  //     setFields(dynamicFieldsData?.Result?.DynamicFields ?? []);
  //   }
  // }, [dynamicFieldsData]);

  // useEffect(() => {
  //   if (dynamicFieldsData) {
  //     setIsDirty(
  //       JSON.stringify(fields) !==
  //         JSON.stringify(dynamicFieldsData?.Result?.DynamicFields)
  //     );
  //   }
  // }, [fields, dynamicFieldsData]);

  useEffect(() => {
    setIsDirty(!(fields.length <= 0));
  }, [fields]);

  // useEffect(() => {
  //   if (!commandResponse.data) {
  //     return;
  //   }
  //   if (commandResponse.data?.ExternalError) {
  //     enqueueSnackbar(commandResponse.data?.ExternalError, {
  //       variant: "error",
  //     });
  //     commandResponse.remove();
  //     return;
  //   }
  //   enqueueSnackbar("Interest dynamic fields updated successfully");
  //   commandResponse.remove();
  //   refetch();
  // }, [commandResponse.data]);

  const handleAddField = () => {
    setFields((prevFields) => [
      ...prevFields,
      { Name: `Field ${prevFields.length + 1}`, Type: "text", Value: "" },
    ]);
  };

  const handleRemoveField = (index: number) => () => {
    console.log(index);
    setFields((prevFields) => {
      const newFields = [...prevFields];
      newFields.splice(index, 1);
      return newFields;
    });
  };

  const handleSave = () => {
    const hasEmptyFieldName = fields.some((field) => field.Name === "");
    console.log(hasEmptyFieldName, fields);
    // if (hasEmptyFieldName) {
    //   enqueueSnackbar("Field name cannot be empty", {
    //     variant: "error",
    //   });
    //   return;
    // }
    // setOrganizationInterestDynamicFields(organizationId ?? "", fields);
    // setIsDirty(false);
  };

  return (
    <Card sx={{ my: 1, mx: 2, boxShadow: "" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Configure Interest Dynamic Field
        </Typography>
        {/* {fields.length === 0 && !isLoading && (
          <Typography sx={{ mt: 2 }} variant="body2" gutterBottom>
            No interest dynamic field is configured for this organization.
          </Typography>
        )} */}

        {/* {isLoading && <InterestDynamicFieldSkeleton />} */}

        {/* {fields.map((field, index) => (
          <Stack key={index} direction="row" spacing={2} sx={{ mt: 4 }}>
            <TextField
              label={"Field Name"}
              fullWidth
              value={field.Name}
              onChange={(e) => {
                const value = e.target.value;
                setFields((prevFields) => {
                  const newFields = [...prevFields];
                  newFields[index] = { ...newFields[index], Name: value };
                  return newFields;
                });
              }}
            />

            <FormControl fullWidth>
              <InputLabel id="field-type"> Type</InputLabel>
              <Select
                id="field-type"
                label="Field"
                value={field.Type}
                onChange={(e) => {
                  const value = e.target.value;
                  setFields((prevFields) => {
                    const newFields = [...prevFields];
                    newFields[index] = { ...newFields[index], Type: value };
                    return newFields;
                  });
                }}
              >
                <MenuItem value={"text"}>Text</MenuItem>
                <MenuItem value={"number"}>Number</MenuItem>
                <MenuItem value={"date"}>Date</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              color="error"
              sx={{
                px: 4,
                borderRadius: 1,
              }}
              onClick={handleRemoveField(index)}
            >
              Remove
            </Button>
          </Stack>
        ))} */}

        <TestDNDComponent
          fields={fields}
          setFields={setFields}
          handleRemoveField={handleRemoveField}
        ></TestDNDComponent>

        <Button
          variant="outlined"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleAddField}
        >
          Add Field
        </Button>

        <Stack direction="row" spacing={2} sx={{ mt: 2 }} alignItems="center">
          <LoadingButton
            variant={"outlined"}
            color={"primary"}
            sx={{ mt: 2, px: 4 }}
            size={"medium"}
            loading={false}
            onClick={handleSave}
            disabled={!isDirty}
          >
            Save
          </LoadingButton>

          <Typography variant="body2" sx={{ mt: 2 }} fontStyle={"italic"}>
            {isDirty ? "Unsaved changes" : ""}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
