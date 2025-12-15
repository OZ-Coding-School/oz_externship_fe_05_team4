import { Link } from 'react-router'

import {
  Button,
  Input,
  Textarea,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  Skeleton,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '../components/common'

function MainPage() {
  return (
    <div className="min-h-screen space-y-6 bg-white p-8">
      <section className="mb-10 border-b pb-10">
        <h2 className="mb-4 text-xl font-bold">팀원 작업 공간</h2>
        <div className="flex gap-3">
          <Link to="/Question/Detail/1">
            <Button variant="outline">Detail Page</Button>
          </Link>

          <Link to="/Question/Create">
            <Button variant="outline">Create Page</Button>
          </Link>

          <Link to="/Question/Edit/1">
            <Button variant="outline">Edit Page</Button>
          </Link>
        </div>
      </section>

      <div className="flex gap-3">
        <Button variant="primary">Primary</Button>
        <Button variant="default">Default</Button>
        <Button variant="outline">Outline</Button>
      </div>

      <Input placeholder="입력해보세요" />

      <Textarea placeholder="내용을 입력하세요" />

      <Select>
        <SelectTrigger>
          <SelectValue placeholder="선택하세요" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="1">옵션 1</SelectItem>
          <SelectItem value="2">옵션 2</SelectItem>
        </SelectContent>
      </Select>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>oz</AvatarFallback>
          </Avatar>
          <span className="text-sm text-[#5C5B5E]">Avatar</span>
        </div>
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  )
}
export default MainPage
