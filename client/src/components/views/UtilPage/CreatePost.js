import React from "react";
import {
  Box,
  Stack,
  FormControl,
  FormErrorMessage,
  Input,
  Textarea,
  RadioGroup,
  Radio,
  Select,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import Header from "./Header";

export default function CreatePost() {
  return (
    <Box w="100%" m="auto" className=" bg-reddit_gray">
      <Header />
      <Box w={["100%", "90%", "80%", "70%"]} m="auto">
        <form>
          Create a post
          <Stack spacing={3}>
            <FormControl>
              <RadioGroup>
                <Stack direction="row" spacing={3}>
                  <Radio value="text">Post</Radio>
                  <Radio value="link">Link</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl>
              <Input value={""} type="text" placeholder="title" />
            </FormControl>
            <FormControl>
              <Textarea placeholder="text(optional)" rows={10} />
            </FormControl>
            <Button type="submit">Submit</Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}
