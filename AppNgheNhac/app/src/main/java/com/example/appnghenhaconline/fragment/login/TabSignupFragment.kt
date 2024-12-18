package com.example.appnghenhaconline.fragment.login

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.Button
import androidx.fragment.app.Fragment
import com.example.appnghenhaconline.MyLib
import com.example.appnghenhaconline.R
import com.example.appnghenhaconline.api.ApiService
import com.example.appnghenhaconline.models.user.DataUserSignUp
import com.google.android.material.textfield.TextInputEditText
import kotlinx.android.synthetic.main.fm_signup_tab_fragment.*
import kotlinx.android.synthetic.main.fm_signup_tab_fragment.view.*
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


class TabSignupFragment : Fragment() {

    internal lateinit var view : View

    override fun onCreateView(inflater: LayoutInflater,
                              container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        view = inflater.inflate(R.layout.fm_signup_tab_fragment, container, false)
        val sex = resources.getStringArray(R.array.sex)
        val arrAdapter = ArrayAdapter(requireContext(), R.layout.i_dropdown_sex_item, sex)
        view.edtSex.setAdapter(arrAdapter)
        event()
        return view
    }

    private fun event() {
        val btnSignup : Button = view.findViewById(R.id.btnSignUp)
        val firstName : TextInputEditText = view.findViewById(R.id.first_name)
        val lastName : TextInputEditText = view.findViewById(R.id.last_name)
        val email : TextInputEditText = view.findViewById(R.id.edtEmail)
        val password : TextInputEditText = view.findViewById(R.id.edtPassword)
        val confirmPassword : TextInputEditText = view.findViewById(R.id.edtConfirmPassword)

        btnSignup.setOnClickListener {
            if(first_name.text.toString().trim() == "" ||
                last_name.text.toString().trim() == "" ||
                email.text.toString().trim() == "" ||
                password.text.toString().trim() == "" ||
                confirmPassword.text.toString().trim() == "" ||
                edtSex.text.toString().trim() == "") {
                MyLib.showToast(requireContext(),"Vui lòng nhập đầy đủ thông tin")
            }
            else {
                when {
                    password.text!!.length < 6 -> {
                        MyLib.showToast(requireContext(),"Mật khẩu phải từ 6 kí tự trở lên")
                    }
                    password.text.toString() != confirmPassword.text.toString() -> {
                        MyLib.showToast(requireContext(),"Kiểm tra lại mật khẩu và Xác nhận mật khẩu")
                    }
                    else -> {
                        val sex: Boolean = edtSex.text.toString() == "Nam"
                        val name = firstName.text.toString() + " " + lastName.text.toString()
                        val encryptPassword = MyLib.md5(password.text.toString())

                        callApiSignIn(name,encryptPassword,sex,email.text.toString())

                        firstName.text?.clear()
                        lastName.text?.clear()
                        email.text?.clear()
                        password.text?.clear()
                        confirmPassword.text?.clear()
                        edtSex.text.clear()
                    }
                }
            }
        }
    }

    private fun callApiSignIn(name : String, password : String, sex : Boolean, email : String) { // call API SignIn
        ApiService.apiService.postSignUp(name,password,sex,email).enqueue(object : Callback<DataUserSignUp> {
            override fun onResponse(call: Call<DataUserSignUp>, response: Response<DataUserSignUp>) {
                val dataUserSignUp : DataUserSignUp? = response.body()
                if(dataUserSignUp != null) {
                    if (!dataUserSignUp.error){
                        MyLib.showToast(requireContext(),dataUserSignUp.message)
                    }
                    else {
                        MyLib.showToast(requireContext(),dataUserSignUp.message)
                    }
                }
            }

            override fun onFailure(call: Call<DataUserSignUp>, t: Throwable) {
                MyLib.showToast(requireContext(),"Call Api Error")
            }
        })
    }
}