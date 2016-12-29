#include <v8.h>
#include <node.h>

using namespace node;
using namespace v8;

void Method(const v8::FunctionCallbackInfo<v8::Value>& args) {
	v8::Isolate* isolate = args.GetIsolate();
	v8::HandleScope scope(isolate);
	args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, "standard output:\n"));
}

void init(v8::Local<v8::Object> target) {
	NODE_SET_METHOD(target, "systemout", Method);
}

NODE_MODULE(binding, init);